"use strict";
// A view of real lifecycle evidence, never an estimated percentage or timer gate.
window.AgPProgress = {
  describe(run, events = []) {
    const has = (kind, match = () => true) => events.some(e => e.kind === kind && match(e));
    const admitted = has("lifecycle", e => e.message === "Robot session running");
    const observed = has("worker_profile", e => e.profile?.stage === "leased_images_accepted") ||
      has("leased_images_reviewed") || (run.mode === "offline_mock" && has("capture"));
    const submitted = has("motion_requested");
    const measured = has("physical_motion_measured");
    const result = has("agent_result") || !!run.outcome;
    const replay = run.replay?.status === "ready";
    const completed = [
      [!!run.id, "Run accepted"], [admitted, "Robot admitted"],
      [observed, "Fresh views received"], [submitted, "Program submitted"],
      [measured, "Movement measured"], [result, "Result recorded"],
      [replay, "Replay ready"]
    ].filter(([done]) => done).map(([, label]) => label);
    const state = (key, title, reason, recovery = false) => ({key, title, reason, completed, recovery});
    if (run.error) return state("failed", "Run failed", run.error + " Review the activity and workspace before starting another run.", true);
    if (!run.active && ["failed", "timed_out", "disconnected", "safety_aborted", "interrupted"].includes(run.status))
      return state("ended", "Run " + run.status.replaceAll("_", " "), "The run ended. Review the last confirmed stage and activity before trying a new task.", true);
    if (!run.active && result) {
      if (run.mode === "offline_mock") return state("finished", "Mock run finished", "Review the program and results. This run did not move a physical robot.");
      if (run.replay?.status === "failed" || run.replay?.status === "unavailable")
        return state("recording-unavailable", "Run finished; replay unavailable", run.replay.note || "The recording could not be retained. Review the saved program and results.", true);
      if (replay) return state("finished", "Run finished", "Replay is ready. Review the actual footage alongside the agent’s result.");
      return state("replay", "Preparing replay", "The run has ended. Waiting for the retained camera recording to become available.", true);
    }
    if (!run.active && ["stopped", "completed", "succeeded", "resetting"].includes(run.status))
      return state("ended", "Run ended", "Review the activity and retained footage. No agent result has been confirmed.", true);
    if (result) return state("replay", "Finishing run and replay", "The agent has reported its result. Normal release and camera recording cleanup are still finishing.");
    if (measured) return state("verify", "Checking the result", "The agent is reading fresh state and camera views to verify what happened.");
    if (submitted) return state("execute", "Executing generated program", "Waiting for matched robot feedback. An accepted command alone does not confirm movement.");
    if (observed) return state("program", "Agent is inspecting and programming", "AgP reviews the fresh images and writes task-specific Python before requesting movement.");
    if (admitted) return state("observe", "Reading fresh robot views", "Fresh measured state and post-preparation images are required before the agent can act.");
    if (has("lifecycle", e => e.message === "Robot session preparing"))
      return state("prepare", "Preparing the robot", "The robot is completing its normal preparation and readiness checks.");
    if (has("lifecycle", e => e.message === "Robot session queued"))
      return state("queue", "Waiting for the robot", "Queue admission and the robot’s normal safety preparation must finish. The agent can plan while it waits.");
    return state("join", "Joining the robot queue", "Submitting the confirmed runner and task to the robot’s normal queue.");
  }
};
