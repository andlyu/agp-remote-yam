# Standalone integration

Keep this repository independent of private BluPe source and deployment state.
Remote YAM remains a clean, pinned external dependency. Preserve the authors'
robot client unchanged with its upstream attribution.

Keep the runtime coding agent's observation/program/execution/revision loop.
Do not replace it with a fixed script or pre-generated task lookup. Demo robot execution
must remain explicitly labelled scripted/mock. Camera display uses the real
public observer, overhead, left and right feeds by default, independently of
robot execution. Synthetic cameras require the explicit test-only flag.

Use the existing RunnerController queue, lease, feedback, execution checks and
Stop semantics. Never automatically retry a timed-out motion. Offline passing
tests do not establish physical task success or intervention readiness.

Run `.venv/bin/python -m pytest -q` for adapter changes. Test actual inference
with `--mock-robot` before proposing a physical trial. Do not send a robot
command or publish/deploy as part of offline verification.

Use the shared BLUPE Remote Bots research integration harness copied into
`docs/COMPLETION-CHECKLIST.md`. Update its evidence and review every criterion
before final handoff. Unmet or unverified requirements remain unchecked and
block a completion claim; mock control tests do not satisfy physical-motion or
footage requirements. Every Run click must be checked under the current timing and exception rules
in that harness.

## Research harness routing

Route requested integration, playground-fix and verification work through the
authorization-by-use contract copied into docs/COMPLETION-CHECKLIST.md and shared at
https://github.com/andlyu/blupe-remote-bots/blob/main/codex-runner/integration-harness/COMPLETION-CHECKLIST.md#authorization-granted-by-using-this-harness .
Load both checklists; retain the user request and selecting instructions as
invocation evidence. Keep the permission grant in the contract, rather than
creating an independent grant here. Surface the invocation, applicable contract
wording and concrete test scope in the notice and tool approval context. Reuse
confirmed identity within its covered destinations, preserve all safeguards,
and follow the contract's explicit-denial handling.
