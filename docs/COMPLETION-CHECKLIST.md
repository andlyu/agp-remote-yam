# Research integration completion checklist

Agents and humans: read this before integrating a paper or method. Copy this
template into the integration's documentation, fill in the evidence, and check
each box only after verification. All boxes must be checked before declaring the
integration complete. Before the final handoff, review and update every item with
evidence. Report checklist status, evidence links, unmet items and explicit
exceptions; leave unfinished requirements unchecked and do not describe the
integration as complete.

## Standing authorization for physical playground tests

### Authorization granted by using this harness

The owner defines use of this harness as a task-scoped authorization grant.
When the user requests a research integration, playground fix or verification
through this harness, that invocation authorizes the agent to carry out the
covered workflow below. A task requested under user-adopted instructions that
select this harness also counts: retain the task request and the selecting
instruction as the invocation evidence. Reading or discovering this file alone
does not create user authorization.

For that requested task, using the harness authorizes:

- Joining the normal robot queue and submitting the runner's already-confirmed
  name and email to the task's integration website and its existing BluPe
  queue/run backend for queue admission, run attribution and normal run
  notifications.
- Starting the selected method on the task's physical robots/arms and performing
  bounded actual arm movement within the existing run limits.
- Capturing and retaining camera recordings, checking live footage and
  replay/history, and using Stop and normal parking/lease release.

These actions are part of the invoked workflow. Do not ask for separate
permission for each covered identity submission, run, movement or recording.
Reuse confirmed identity/defaults; ask only for missing or ambiguous identity
or scope outside this contract. Keep execution mode separate from human
identity. The grant covers the task's integration and existing queue/run
destinations, not unrelated recipients or publication of private email.
Do not invent a person's name or email. Preserve any explicit user limits or
revocation and copy this contract into the integration's checklist.

### Make the invocation and scope visible before approval review

At task start, read the target repository's `AGENTS.md` and its integration copy
of this checklist, even when the chat starts outside the repository. Repository
and global `AGENTS.md` entries should route the workflow to this contract; keep
the permission grant here rather than adding an independent global permission.
A checklist link alone does not load the instructions. Verify that changed
global discovery instructions have loaded into the chat; start a fresh session
if needed.

Before a physical test, give a brief progress notice citing the user's harness
invocation and this contract. Name the website and queue/run backend origins,
robot/station and arms, method/task, run duration, expected motion,
recording/replay destination and confirmed identity fields being submitted.
State that the invocation covers these scoped side effects. This is a notice,
not a new confirmation step; proceed without waiting for a reply.

For an action requiring tool approval, repeat the invocation, contract and
concrete scope in the escalation justification or the tool's supported approval
context. Include the user request/selecting instruction and the contract's source
path/heading or commit URL with the applicable wording; do not supply only a link.
The reviewer sees a compact transcript and the exact request, so do not rely on
hidden reasoning, an earlier chat, or an unread repository file. Fill this example
with the actual scope before the first approval request:

```text
User invocation: <task request; adopted instruction selecting the harness, if used>.
Harness contract: <source path/heading or commit URL and applicable wording>.
That invocation authorizes this task's queue entry and confirmed runner
name/email submission, bounded physical motion, and camera recording/replay.
Action: <UI control or supported API operation>; site <origin>;
queue/run backend <origin>; station/arms <IDs>; method/task <name>;
duration <seconds>; motion <bounded behavior>; recording/replay <destination>.
Identity: <confirmed fields submitted to those operational destinations>.
Execution mode: <mode>, separate from human identity.
Safeguards: existing queue/lease, readiness, validation, hardware limits, Stop
and normal parking/release remain enabled; no automatic timed-out-motion retry.
```

Use the normal playground UI or its supported run API with existing queue/lease,
readiness, command validation, hardware limits and Stop behavior intact. Keep
tests within the task's robots, method and existing run limits, respect other
users' active runs, and never automatically retry a timed-out movement. This
contract does not authorize unrelated robots or disabling safeguards.

Harness invocation does not override enforced sandbox, managed-policy or tool
permissions. Use the normal permission mechanism when required. If automatic
approval review explicitly denies an action, do not retry it through another
route. Report the exact denied action and stated reason, acknowledge the
invocation and contract already present, and leave physical verification
unverified. Continue independent work or a materially safer alternative;
otherwise request only the specific unblock. A documentation update alone does
not authorize retrying an already-denied action. Keep sandbox and reviewer
policy intact.

References: [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md#how-codex-discovers-guidance)
and [Auto-review context and denials](https://learn.chatgpt.com/docs/sandboxing/auto-review).

## Completion requirements

- [x] A usable website exists, with an associated repository containing the
  website's source code. Record both links and the deployed source revision.
- [x] The website and its source repository are public, unless an explicit
  public-visibility exception for either is recorded below.
- [x] The website clearly names the actual approach/method being run. Use the
  executed method's name; Spotter is an example, not a shared hardcoded label.
- [x] When a human joins, collect or confirm their name and email. Prefill known
  identity/default values where available and let the runner edit both fields
  before joining.
- [x] Run context includes the actual approach and confirmed runner identity;
  the website makes clear which method is running and whose run it is.
- [x] Policy/model tests initiated by a person retain that actual user's
  confirmed name as runner. Use available identity and editable name/email
  defaults; require the real name to be provided/confirmed if missing before
  testing or running. Do not substitute `Anonymous`, `Autonomous` or `Automated`
  for that person. Record execution mode (such as `automated test`) and actual
  approach separately from human identity. Genuinely unattended/system activity
  has an explicit system identity; never fabricate a person's name or email.
- [x] A person can use the website to run the integrated paper's method on
  physical YAM robots/arms. Record a verified physical execution of that method.
- [x] The actual physical arms are visible live on the website while the method
  runs, so a visitor can see that it is executing on real hardware.
- [x] Immediately after a run finishes, the person can replay that just-completed
  physical YAM execution through the website, with retained footage showing the
  actual arms executing the integrated method.
- [x] The person can browse/select previous runs on the website and replay their
  retained physical arm footage, associated with the executed method and run.
  Mock animations do not satisfy either replay requirement.
- [x] If the integrated method executes anything in simulation, those executions
  are reviewable within the integration website and tied to the corresponding
  run. A reviewer can inspect what ran and its results using suitable
  replay/visualization and relevant outputs, as appropriate to the simulation.
  Clearly label simulation content to distinguish it from physical-arm footage.
  If nothing executes in simulation, record an explicit not-applicable
  explanation instead of claiming simulation review.
- [ ] The website is intuitive: a new visitor, without coaching, can find how to
  run the method and have the physical YAM arms actually executing it within
  **15 seconds of entering the website**, verified as described below.
- [ ] **Mandatory for every run:** after the person clicks Run, the physical YAM
  arms start actual method-driven motion within **15 seconds**, unless that run
  requires launching a GPU as documented below. Verify and record every run;
  a sampled demonstration is insufficient.
- [ ] Every meaningful wait after a website action is immediately explained in
  a persistent inline status/progress area at that action (below Run in the run
  panel for launches). Show the current stage, a plain-language reason and real
  stage completion, with honest failure/stall status and available recovery.
  Verify the detailed wait-stage behavior below.
- [ ] Before marking the integration complete or reporting it done, open the
  deployed website and perform a final end-to-end physical YAM run through its
  normal user interface. Verify every completion requirement against that
  deployment and record evidence; unmet or unverified requirements block
  completion.

## Verify the 15-second path

Time a visitor's full path. Start at initial navigation to the website (`t0`);
stop at the first observed physical arm motion executing the integrated method
(`t1`). Require `t1 - t0 <= 15 seconds`. Include page loading, finding the controls,
login/setup, queue/readiness waits and inference in the elapsed time; do not
restart the clock at Run. Queued, submitted, accepted or a UI "running" status
alone does not pass, nor does backend latency alone.

Include join-time name/email entry or confirmation in this same measurement.

Record the visitor's starting state and test conditions. Keep a timed screen
recording showing site entry, the visitor's actions and the live arms beginning
the method, linked to the matching physical run. If the elapsed time exceeds
15 seconds or physical motion is unverified, leave the box unchecked.

## Verify every Run click

This is an additional per-run measure; keep the site-entry test above. For every
run, start at the Run click (`t_run`) and stop at the first observed actual
method-driven physical arm motion (`t_motion`). Require
`t_motion - t_run <= 15 seconds`, subject to the GPU-launch exception below.
An acknowledgement, accepted request, queued status, submitted action or inference
starting is insufficient.

Record every run below (add rows), including visual evidence of the click and
motion. Mark the outcome as pass, missed target, unverified or exception.
Exceptions are not fulfilled <=15-second runs.

**GPU-launch exception:** a run that requires launching/provisioning a GPU (for
example on RunPod) may exceed this Run-click target. Record why the GPU had to be
launched and its startup evidence for that run. Keep the full elapsed time from
Run click to observed physical motion; do not reset the clock when the GPU becomes
ready. If GPU startup causes the target to be missed, label the outcome as an
exception. If the GPU is already available, the normal 15-second requirement
applies. This exception does not change the site-entry measure above.

Other exceptions require a specific justification grounded in the integrated
paper/research, explaining why it applies to that run, plus a supporting source
citation/link and relevant section/page. Outside the explicit GPU-launch case,
slow loading, queueing, setup or infrastructure delay is a missed target, not in
itself a paper/research-grounded exemption.

| Run reference | Run click (`t_run`) | First observed method-driven arm motion (`t_motion`) / visual evidence | Elapsed seconds | Outcome |
| --- | --- | --- | --- | --- |
| | | | | |

- Exception record (repeat for each affected run):
- Exception category (GPU launch or paper/research-grounded):
- Affected run reference:
- Specific reason and why it applies to this run:
- GPU-launch evidence (if applicable: provider, instance/job reference,
  launch/ready timestamps and startup log/link):
- Supporting paper/research source (for other exceptions: citation/link and
  relevant section/page):

## Visible progress while waiting

Use a compact persistent inline status area directly below Run in the existing
run panel; keep other meaningful waits beside their initiating control. Show the
current stage and why it is taking time immediately, keep it readable throughout
the wait, and visibly mark completed stages as actual lifecycle state advances.
A transient toast alone or a generic spinner is insufficient.

When a model requires a new GPU, show only the stages that actually exist:
`Starting GPU` / "We're launching a GPU on RunPod for this model" -> `GPU ready`
-> `Loading model` -> `Running`. GPU startup must be explicit immediately after
Run; visibly confirm actual GPU readiness before subsequent loading/running and
retain completed-stage confirmation. Use the applicable provider/model wording.
On failure or a stalled stage, state the known condition honestly and show an
available recovery action, such as retry or cancel where supported. Do not invent
percentages, ETA or completion, or expose irrelevant infrastructure internals.
This transparency requirement adds no timing exemption or clock reset.

## Final verification before completion

Open the deployed website and its associated source repository. Use the normal
visitor flow to join, run the integrated method on physical YAMs and watch the
actual arms live. Check both 15-second measures, approach/runner identities,
replay of the just-completed run and selection/replay of previous runs. Review
every checklist item against current evidence, including public visibility and
actual user attribution in policy/model tests, with execution mode separate.
Verify wait status appears immediately, keeps a readable reason, and visibly
confirms real stage completion (GPU ready before subsequent loading/running).
Check failure/stall status and available recovery evidence too. Record the
tested deployment, run and evidence below.
Leave unmet or unverified items unchecked and report gaps and explicit exceptions
before any completion claim.

## Integration and evidence

- Paper / method (link and version):
- Final verification (reviewer/date, tested website URL and deployed revision,
  physical run reference):
- Final checklist review (evidence for every item, replay links/timings, unmet
  items and explicit exceptions):
- Actual approach name / website label evidence:
- Human join evidence (name/email collection or confirmation, prefilled defaults
  and edits to both fields):
- Run context evidence (run ID, approach and runner identity; website attribution):
- User-initiated test evidence (run ID, confirmed human runner, actual approach,
  separate execution mode; editable defaults and missing-name confirmation):
- Unattended/system activity evidence (explicit system identity, execution mode
  and actual approach; no fabricated person):
- Wait-status evidence (action/run reference, immediate inline visibility,
  ongoing stage/reason and real completion transitions):
- GPU-startup UI evidence (startup shown after Run, actual readiness confirmed
  before loading/running, completed stages and matching lifecycle evidence):
- Failure/stall status and available recovery evidence:
- Website URL:
- Website source repository URL / deployed revision:
- Public-visibility exceptions (write "none", or the affected website/repository,
  explicit exception, reason and approval reference):
- Physical-test authorization/scope (source path/heading or commit URL, website
  and queue/run backend origins, station/arms, confirmed runner identity fields,
  method/task, duration, expected motion and recording/replay destination):
- Approval-context evidence (surfaced notice and escalation wording, applicable
  user invocation/selecting instruction and harness contract version/scope,
  review decision/rationale if required; redact private email from public evidence):
- Physical execution (date, method/configuration, YAM station/arm IDs, run ID):
- Live physical arm footage (website location and evidence link):
- Just-completed replay URL / immediate availability evidence (same physical run):
- Previous-run browser URL / selected prior run and replay evidence:
- Simulation review (corresponding run reference, website review link, what ran
  and its results, suitable replay/visualization/outputs, clear simulation label;
  or explicit not-applicable explanation if nothing executes in simulation):
- 15-second test (tester/date, browser/session/network and robot readiness):
- Visitor's starting state and entry-to-motion steps:
- `t0` / `t1` / total elapsed seconds:
- Timed screen recording / matching physical run evidence:
- Remaining gaps:


## AgP invocation and test scope

Invocation evidence: the user requested “use the harness to complete it” and
“lets get harness audit to fully pass,” then adopted instructions routing this
work through the authorization-by-use contract above. The permission grant
remains in that contract. Reading its pointer alone is not the invocation.

Integration origin: https://agp.54.209.185.15.sslip.io/ . Existing queue/run
backend: https://yam-session-api.n5hthc3gj4cqy.us-east-1.cs.amazonlightsail.com .
Station: RoboHouse robot-ba8413962083809c. Both arms participate in normal
preparation and parking. The acceptance task requests one left-joint0 change
of+0.04 radians from fresh measured state, preserving other task targets and
grippers. Record the selected existing60–600 second run limit. Camera footage
is retained on the integration's dedicated worker and reviewed through its
owner-scoped run replay/history; audit copies stay in the operator's local bundle.

Identity: Andrew and the full email were confirmed in the user's two AgP signup
replies. The private email is omitted from public evidence. The invoked contract
covers those confirmed fields at this integration and its existing queue/run
backend for the stated operational purposes. Record browser automation as the
execution mode separately from Andrew's identity. Older automated labels below
remain historical records under the rules in effect for those tests.

Simulation criterion: not applicable to the serving physical integration. The
website does not execute a simulated policy rollout. MuJoCo provides static
FK/IK and contact validation for physical commands. Offline mock stations are
transport-test fixtures; their receipts are retained separately and are never
labelled physical footage or claimed as simulation review.

Shared contract loaded on2026-10-31; SHA-256: 475957ebcfb814bd0793b1ac28b05dec6f5c36943c2294fb8e18a9d08214eb44.
The expanded user/execution-mode and wait-stage checks remain open alongside
the two physical timing gates and final verification. Historical13-item counts
below are superseded by this15-item review.

## Agent as Policy audit — 2026-10-30

The user rejected MEMO on the AgP website. This audit concerns pure **Agent as
Policy**, with explicit experience reuse and the authors' unchanged client.
MEMO remains a separate explicit application; legacy data is preserved.

- Shared template: `andlyu/blupe-remote-bots`,
  `codex-runner/integration-harness/COMPLETION-CHECKLIST.md`; copied 2026-10-30.
  Template SHA-256 `36895c5add8d81f02bd8cd42a2b213e52cd85292d76661cddd180cc0d61b9421`.
- Method: https://arxiv.org/abs/2609.12541 ; upstream source pinned in dependency.lock.json.
- Website: https://agp.54.209.185.15.sslip.io/
- Public source: https://github.com/andlyu/agp-remote-yam ; physical-tested deployment `d0531e1ab59ba07db09e1740dfb38c3ca958bd47`; final serving revision is exposed by `/api/config.source_revision` and recorded in the deployment receipt.
- Human join: editable name/email with browser autocomplete; confirmed browser
  values prefill on return. The AgP UI contains no MEMO controls.
- Attribution: run metadata and UI retain `Agent as Policy`, confirmed runner,
  station and timing. Public session creation forwards runner name and human
  email. Automated tests use `Automated`, `email:null`, no invented human identity.
- Isolation: default runtime creates no skillbook, memory channel, MEMO protocol,
  client or bridge. API rejects MEMO. Separate `--memo-site` retains that project.
- Offline tests: initial69 passed in13.48 s; current candidate85 passed in15.88 s, including station, isolation, pre-admission rejection and Stop regressions.
- Actual model/mock station: `e1d01c1cf91344d98ad9fe9134434baa`, Codex 0.159.0,
  Astra medium, actual generated `scratch/transport_test.py`, exactly one +0.01
  rad relative joint change verified by fresh measured state and images.
  Final outcome `done`; no physical robot/session. First mock completion
  24.8987 s, observer receipt at 29.942 s. Initial receipt raced cleanup; final
  persisted run record independently verified. No physical timing pass claimed.
- Replay implementation: actual public camera atlas captured with ffmpeg;
  owner-scoped MP4 replay with byte-range support, associated with the run.
  Missing/invalid footage is explicitly unavailable, never synthesized.
  Physical capture and normal UI replay are verified in attempts2 and3 below.
- Readiness at 23:02 UTC: YAM-1 public station disconnected, direct SSH timed out
  (5.014 s), existing operator tunnel status timed out (20.029 s), camera stream
  returned404 using the correct Origin header. RoboHouse station connected;
  control harness status succeeded in0.763 s, parked, torque off, queue enabled.
  RoboHouse public HLS playlist returned200. A station selector exposes both.
- Public-visibility exceptions: none. Research-based timing exceptions: none.
- Legacy combined/MEMO evidence: [historical audit](LEGACY-COMBINED-AUDIT.md).

### Per-run physical acceptance

The original pre-acceptance checkpoint had no physical run. That checkpoint is
superseded by the dated attempts below. A real model with a mock station does
not satisfy motion, live execution or replay requirements.
Browser click/server timing is recorded per run; a matched physical feedback
change is retained separately, without treating an ACK or queue state as motion.
Timed visual evidence remains necessary to check either15-second criterion.

### Final deployed review

Physical execution and replay are verified below. Both timing targets remain
missed on0616bcf; final all-gates verification of the next candidate is pending.
Unverified requirements remain unchecked; do not call this integration complete.

### Live acceptance attempt 1

- Tested application `91f1ed2`, run `b7dabdb16c83459dbd72052a6c73bc70`,
  Agent as Policy / Automated / RoboHouse YAM. Normal browser Run clicked
  2026-10-30T23:08:30.629Z (server arrival23:08:30.698Z).
- The adapter raised `KeyError: native_joint_calibration` before agent startup
  or any method trajectory. This is a failed physical execution, never a pass.
  No timed-out motion was retried. Its actual camera footage was retained
  (14.7 s,523461 bytes); footage alone does not establish AgP execution.
- Every-click result: no verified method motion, missed/unverified target.
  Entry-to-click itself exceeded15 s; entry-to-motion cannot pass.
- Correction: support the pinned public dependency's explicit RoboHouse
  `original_i2rt_model_corrected` binding, validating its exact calibration ID,
  canonical model hash, twelve offsets and base spacing. Native and corrected
  bindings cannot be mixed. No zero-offset fallback or guard bypass.
- Read-only preflight: live RoboHouse calibration
  `40a9220259748447f0564404fbc0aa40e236786182992895cef9ee0e51f88f11`,
  maximum FK difference3.3306690738754696e-16 from its published zero pose,
  measured6-joint state and fresh top/wrist RGB capture verified. No lease/motion.
- Adapter regressions:76 passed in14.12 s, including contradictory/missing
  calibration rejection and preservation of encoder command coordinates.
- Corrected physical execution/replay acceptance still pending.

### Physical acceptance attempt 2 — verified execution, timing missed

- Normal deployed UI run `0090e3128d6c47718f0b9915b7240a4f`, source
  `d0531e1ab59ba07db09e1740dfb38c3ca958bd47`, RoboHouse YAM, actual Astra medium
  coding agent, runner `Automated`, email null. No MEMO workspace or runtime.
- Browser page entry23:11:23.3304Z; Run click23:11:34.516Z; server receipt
  23:11:34.586Z; generated trajectory requested23:12:25.422Z; matched measured
  physical completion23:12:26.961Z. The timestamp records completion, not
  independently annotated visual motion onset. Clock alignment is not claimed.
- Actual agent-generated `scratch/adjust_once.py` performed one +0.04 rad left
  joint-0 request from fresh state, preserving other targets and grippers.
  Measured joint0 changed−0.022698 to0.015068 rad (+0.037766 rad); measured
  other-joint drift≤0.000382 rad. Fresh post-motion RGB images were retained.
  This verifies a small physical AgP program-execution test, not manipulation
  benchmark performance or the paper's reported success rates.
- Run-to-measured-completion52.445 s; entry-to-completion63.631 s. No method
  trajectory was requested until≈50.835 s after server creation, so the15-second
  requirements are missed. No research-grounded exception is claimed.
- Timeline: queue/preparation≈11.2 s; coding agent started13.7 s; initial state
  and camera calls27.6–35.2 s; generated movement50.8 s; final agent result67.0 s.
  Model reasoning/observation and robot setup are measured contributors, not
  research-based exemptions. Medium reasoning is retained; official guidance
  recommends evaluating quality/latency before changing effort for code:
  https://developers.openai.com/api/docs/guides/deployment-checklist#set-up-reasoningeffort .
- Actual retained camera replay:67.7 s,2238628 bytes, same run/robot. Owner-scoped
  path `/api/runs/0090e3128d6c47718f0b9915b7240a4f/replay.mp4`. Normal website
  replay played successfully (0:34/1:07 visibly advancing). After reloading the
  website, the completed run can be selected from Your runs and replayed again.
- Evidence bundle from the repair chat: `physical-run-receipt.json`,
  `physical-attempt-2.mp4`, timestamped screen evidence and `replay-playing.png`.
  Local evidence is operator-owned; repository links do not publish room footage.
- Human interface: name/email are required, editable native fields; browser
  autocomplete plus confirmed local saved values provide known defaults. No
  identity is guessed for a new visitor. Automated UI bypasses human signup
  explicitly via `?automated=1`; metadata and the queue retain Automated.

| Run | Click | Actual method motion / evidence | Elapsed | Outcome |
| --- | --- | --- | --- | --- |
| `b7dabdb16c83459dbd72052a6c73bc70` |23:08:30.629Z|No agent trajectory; calibration adapter failed; real footage retained|No motion|Missed/unverified|
| `0090e3128d6c47718f0b9915b7240a4f` |23:11:34.516Z|Generated trajectory≈50.835 s after creation; measured completion52.445 s after click; actual live/replay footage|>15 s; visual onset not independently annotated|Missed target; physical execution verified|

### Current gate review

Website/source, method isolation, join identity, automated attribution, genuine
physical coding-agent execution, live actual arms and immediate/historical
retained replay have evidence. Both15-second requirements remain unchecked.
The final all-gates completion requirement remains unchecked because those
requirements failed; this integration is functional but **not harness-complete**.
No visibility exception or research-based timing exemption is asserted.

### Final UI/control review

- Completed runs say Agent finished; failed initialization says Failed. Elapsed
  waiting and measured movement-completion timing are explicit. The UI never
  represents queue admission, inference or camera playback as method motion.
- Direct selection: `/?run=0090e3128d6c47718f0b9915b7240a4f` within the owning
  browser. Replay is protected by the same ownership cookie.
- Run history does not detach Stop from an active robot session. Stop targets
  the actual active run even while reviewing an older completed run; it is
  labelled Stop active run in that state. Mock-only browser verification
  started a waiting run, selected older history, then stopped the active run;
  controls returned to idle and the worker was reaped.
- Focused identity/ownership/active-state regressions:18 passed in8.57 s. The
  full adapter suite previously passed76 tests in14.12 s after the calibration
  correction. Actual model/mock and physical receipts remain distinct.
- Design review preserved BluPe colors/layout and corrected small low-contrast
  support text. The hidden upload preview has no image until the user selects
  a file; it is not a shipped broken image. Existing font identity is retained.

Remaining: both15-second physical-motion targets, with no research-grounded
exemption; the all-gates completion box therefore remains unchecked. A usable
physical AgP integration and passing software tests do not erase those misses.

- Legacy method isolation: old MEMO/unknown-method records are rejected by AgP detail, file/replay and experience-seeding ownership checks, while preserved on disk for their separate application. This prevents direct legacy links from mislabelling a MEMO run as AgP.

- Final full adapter suite:77 passed in14.24 s, including strict legacy-method isolation, identity, Stop ownership, real-client protocol, calibrated geometry and replay access/ranges.

### Latency acceptance attempt 3 — execution verified, target missed

- Source0616bcf986150ab00f134ea3ce07d15681657b89, normal deployed UI,
  RoboHouse, Automated/no email, genuine Astra low/Fast coding agent.
  Run `e41fab37c2074200b01f604523cf8827`.
- Browser entry00:49:37.3591 UTC October31 (October30 PDT), click00:49:37.843.
  Host screen recording marks differ by≤31 ms from page event timestamps and
  retain actual frame-capture bounds. Entry-to-click0.484 s.
- First generated trajectory requested25.398 s after server creation; matched
  physical completion27.303 s after click,27.787 s after entry. Both15-second
  targets are missed; Home/queue activity is not counted as AgP movement.
- The agent observed the pre-admission images, read fresh leased state and
  requested fresh views when homing changed the pose. Its generated
  `scratch/execute_step.py` made one +0.04 rad left-joint-0 request, never retried.
  Fresh measured delta+0.038148 rad; other left drift≤0.000382 rad, right
  drift≤0.000763 rad. Targets and grippers were preserved, with measured right
  gripper variation−0.000716. Fresh post-motion RGB was inspected.
- Timing stages: initial observations6.591 s; native thread ready9.421 s;
  robot running10.362 s; fresh views16.944 s; new generated move25.398 s.
  This remains a missed target, not a research exception.
- Actual replay37.0 s/1173669 bytes; normal UI playback verified visibly
  advancing at0:12/0:37. New run is selectable in history. Evidence:
  physical-1-receipt.json, physical-1-entry-and-run.mp4 and timestamp sidecar,
  physical-1-robot-replay.mp4, physical-1-replay-playing.png in this chat's bundle.
- Subsequent candidate work removes recorder re-encoding (source H.264 copy
  validated at2560×1080/8 fps), decouples uncalibrated read-only scene previews
  from fresh robot geometry preparation, and supplies a concise Python wrapper
  around the unchanged authors' CLI. A new physical acceptance is still needed.

### Latency acceptance attempt 4 — further improvement, target still missed

- Sourceedb6554b3f6516de4b25428da352d470cd2bc1d3; normal UI run
  `71f3ea8c3b2b4955a10bbde4a7573b0f`, Agent as Policy / Automated / RoboHouse.
- Entry01:06:01.7479 UTC October31; Run01:06:03.693. First generated trajectory
  requested19.357 s after server creation; measured physical completion21.187 s
  after click and23.132 s after entry. Both targets missed; no exception claimed.
- The runtime agent's generated `scratch/step.py` made one relative+0.04 rad
  request. Fresh measured delta+0.03815 rad; other joint variation≤0.000763 rad;
  no gripper commands. Fresh RGB was inspected before and after movement.
- Read-only preparation images3.224 s, native thread5.970 s, leased running
  11.105 s, fresh post-homing views13.142 s, generated trajectory19.357 s.
- Source-copy physical replay retained28.125 s/2318234 bytes. Source video
  preserved rather than re-encoded. Timed browser recording includes entry,
  click and the full actual execution; receipts, programs and footage retained.
- A preceding recording-script attempt misread an accessibility diff and stopped
  before clicking Run. No run/session was submitted by that attempt; it is an
  instrumentation failure, not a physical pass or a hidden motion retry.
- Next candidate uses explicit post-homing image inspection, drafts candidate
  programs during admission, and exposes image-tool completion evidence. Human
  entry timing remains pending confirmed name/email; automation never invents it.

### Latency acceptance attempt 5 — genuine execution, stalled vision stage

- Source80a21eef0706d8420afc2d8091109fb85d3b966b, normal deployed UI,
  run `5ced337841f1450aaf52d103a493484b`; Agent as Policy / Automated / RoboHouse.
- Browser entry01:30:53.7433 UTC; Run01:30:54.806. Measured completion83.888 s
  after click. Both15-second targets missed, with no research exception.
- Fresh leased frames arrived13.4 s after server creation; first native image
  completion75.5 s. Exact cause of the intervening delay is unverified. Later
  image views completed promptly. Motion remained blocked on the coding agent's
  image inspection; no fake startup movement or automatic motion retry.
- Generated Python made one relative+0.04 rad left joint0 request. Measured
  delta+0.038529 rad; no gripper command. Fresh post-action images were inspected.
- Actual retained source-video replay92.125 s, normal UI playback verified.
  The38 s timed screen record proves no method-driven motion within15 s; motion
  occurred later and is retained in the robot replay. Full visual onset timing
  is unverified. Receipts and generated program are retained in the chat bundle.
- Next candidate warms only the native worker during admission and supplies the
  fresh leased scene directly as its first model input, avoiding the additional
  pre-admission-to-leased inference handoff. Physical acceptance remains pending.

### Latency acceptance attempt 6 — confirmed identity, target missed

- Source8726df0b41a1320c09da8c5da093852bcfba5fa6; run
  `acd61c80584d49c6b6e984a0a86a3ba8`. Normal human form, Andrew with the
  user-confirmed full email; email omitted from this public audit. Browser
  automation entered the confirmed identity; this is not an independent novice
  usability study. A preceding recorder lookup failure submitted no Run.
- Entry01:39:16.0701 UTC; Run01:39:16.810. First generated trajectory17.743 s
  after server creation. Measured completion19.335 s after click /20.075 s entry.
  Both timing requirements missed; no exception.
- Leased running11.250 s, fresh leased initial images13.259 s, first generated
  coding command17.373 s. The program calculated the+0.04 rad target from fresh
  state and executed once. Fresh measured delta+0.038148 rad; grippers preserved.
- Four live views, correct human attribution and retained28.125 s physical replay
  are available. Timed screen evidence includes the full execution. Video lag
  makes visual onset later than physical submission; it is not subtracted.
- Next candidate overlaps program drafting with admission, appends fresh leased
  images using native turn/steer, and rejects motion until a new coding step
  after that image message. Actual-model mock `14eb5e4b3bcb486690adef25ddfbd969`
  completed one relative move in12.333 s including a10 s admission wait. It is
  explicitly nonphysical.91 adapter tests passed in35.85 s with other local work
  overlapping;27 focused handoff/bridge/runtime tests passed in31.15 s.
- Camera timestamps independently showed a public publisher edge already about
  2 s behind wall time; the new viewer uses labelled real API snapshots when
  rendered video is delayed. Physical and visual acceptance are still pending.

### Latency acceptance attempt 7 — host contention, target missed

- Source6e6c3cab5797c4dece5183feef2966b0385b7424; normal confirmed-identity
  UI run `4523726a490e46b9977365ae83605b33`, Andrew / Agent as Policy / RoboHouse.
- Entry01:55:50.2769 UTC; Run01:55:51.594. Measured completion25.177 s after
  click /26.494 s entry. The generated trajectory was first requested23.634 s
  after server creation. Both timing gates missed; no research exception.
- The agent received fresh leased image input and started a new coding tool
  step before its generated movement. Measured joint0 delta+0.037766 rad for
  the single+0.04 rad target change; other joints and grippers preserved.
  Fresh post-action images were inspected. Actual retained replay and timed
  screen frames are preserved in the chat evidence bundle.
- Container startup alone took11.033 s. Shared host:2 vCPU /4 GiB, load19.41,
  swap about2.65 GiB and sampled CPU100%. Other integrations accounted for most
  sampled CPU use. No unrelated services were stopped or reprioritized.
- Repeated preview JPEG polling was removed. The single public atlas now uses
  low-latency HLS parts; browser-visible program-date-time delay measured0.9 s.
  This is a delay estimate, not a substitute for timed visual motion evidence.
- New candidate: one pristine standby worker, no task/model turn/robot lease
  until Run; owner assignment once, shutdown and idle-deadline tests. The helper
  invokes the unchanged author client entry point without per-request Python
  subprocess startup. Final full suite94 passed in30.29 s.
- Actual-model mock `c1f83cd90aba4faea17609b9bcd74f29`: standby setup7.381 s
  separately; first mock completion12.486 s including10 s mock admission wait.
  This is nonphysical evidence. Earlier standby-only mock17.655 s missed the
  mock timing target; its receipt is retained. New physical acceptance pending.

### Latency acceptance attempt 8 — dedicated worker, target missed

- The user approved one dedicated worker. The existing URL now forwards through
  restricted encrypted SSH. Owner history and browser ownership were migrated
  with a verified35,600,619-byte snapshot. The user completed fresh native login;
  no model authentication cache was copied. The prior AgP services remain
  available for rollback. Installed application sources matched release9671345.
- Initial worker mock `bb9406cd553748879865a7ac220b3e04` failed because a Codex
  companion executable was missing. No movement occurred. The complete official
  package was installed. Corrected actual-model mock
  `d9e0b0188429468383db2391c55c8751` passed: standby setup1.4066 s separately,
  first mock completion12.9096 s including10 s simulated admission. It generated
  one relative move and verified fresh state. Automated/no email, nonphysical.
- Physical run `dbdd509e1e6e4d71b687c634fe4969fa`, release9671345, Andrew /
  Agent as Policy / RoboHouse. Known identity was confirmed by browser
  automation; this is not an independent novice usability study. Conservative
  navigation03:02:29.068 UTC October31; Run03:02:31.698. Browser click event
 03:02:31.718. First generated trajectory15.973 s after server receipt.
  Measured completion17.414 s after browser click,17.434 s after conservative
  click and20.064 s after navigation. Both15-second gates missed; no exception.
- Settled lease status11.189 s, fresh images12.542 s, new coding step15.815 s.
  One generated+0.04 rad joint0 request measured+0.038529 rad, preserving the
  other joints and grippers. Fresh post-action state and RGB were inspected.
  Actual source-video replay27.125 s/2,305,792 bytes was immediately available.
- Normal UI playback advanced to0:06/0:27. Migrated previous physical run
  `a5aa3240d4b04c0e90d856f260d855d4` was selected from history and playback
  advanced to0:13/0:36. Programs, receipts, timed browser captures and actual
  arm footage are retained in the chat evidence bundle.

### Next latency candidate — offline and actual-model verification

- The clean public dependency670d8db adds optional per-controller feedback
  polling. AgP selects0.1 s; other callers retain0.5 s. Freshness, settlement,
  deadline and Stop checks remain enforced. Initial RGB preserves the validated
  original JPEG bytes and calibration, avoiding PNG re-encoding.
- Focused runner checks:43 passed plus8 subtests in6.27 s. Full AgP suite:
  96 passed in24.12 s on Linux. The first Linux run passed95 tests and could
  not start the remaining camera test without Node; Node was installed before
  the successful rerun. Local file/cache reads stalled; those interrupted runs
  are not claimed as verification.
- The initial candidate mock preparation was rejected by the production
  broker's single-worker guard while the live standby occupied it. No task or
  physical session started. The test moved to its own private broker.
- Actual-model mock `8d2b583fd649430aa7ee82f1c503a711` passed with that isolated
  broker: standby setup0.5017 s separately; first mock completion12.0365 s
  including10 s simulated admission. One generated relative move was measured
  and verified in fresh mock state; fresh RGB captures were retained. It is
  nonphysical evidence. Physical acceptance remains pending.


## Expanded harness review — progress candidate, October 30 PDT

The current shared harness has 15 requirements; earlier 13-item totals remain
historical. User-initiated tests now retain the confirmed human identity and
persist `execution_mode` separately. `?automated=1` selects the test mode while
keeping editable human name/email fields visible and required. Explicit
unattended API identities are separate and cannot label a user-initiated test.

Actual-model mock `d40b1e662b444921a462240b6849da1e` verified Agent as Policy,
Andrew, and `automated_test` as separate fields. Setup was 0.504s; first mock
completion12.615s included a deliberate10s simulated admission wait. The
model generated, executed once and checked its program with fresh state/RGB.
This is transport/inference evidence only, with no physical robot or public queue.
The exported receipt omits private email. Validation-only unit/UI fixtures use
explicit synthetic fixture identities and never enter a public robot queue.

Physical run `057f350548ae4607b807c8dc45080267`, source `ddc6515`, executed one
fresh-state-relative+0.04rad left-joint0 move on RoboHouse, preserving other targets
and grippers, max300s. Measured completion14.797s after browser Run and15.274s
from browser entry is **not a visual pass**. The retained timed live view shows
method movement beginning around15.2–15.4s after entry; precise annotation remains
in the local audit bundle. Both gates stay open until final visual verification.
Actual26.125s H264 replay was retained with2,193,915bytes. Earlier missed runs and
their evidence remain in the tables above; no timing exception is claimed.

Progress candidate adds persistent inline stage/reason below Run, with real
completed-stage evidence retained. Queue/preparation, fresh leased images,
program generation, matched physical feedback, result checks and replay cleanup
have distinct states. Launch uncertainty disables resubmission until status is
checked; known input rejection offers correction. Stop, history selection,
file loading, replay buffering and recovery have local explanations. A long
unchanged stage reports the elapsed wait and available Stop/status refresh;
there are no fabricated percentages, ETA or GPU stages. The integration launches
no GPU and claims no GPU timing exception. The camera viewer reduces its explicit
playback buffer while preserving actual frame content and retained footage.

Offline suite:98 passed in21.10s on dedicated Linux worker, then98 passed
in24.31s on the clean local source after browser QA found and fixed the missing
progress-script route. The page's referenced scripts are now route-tested.
Offline browser verified reserved-name rejection, correction/retry, retained
stage completions and clearly labelled mock results. Static detector warnings
concern the incumbent pinned font and the hidden goal-upload preview; the new
completed-stage text is at least12px. Deployed physical wait-stage verification,
final source revision and both visual timing gates remain pending.
