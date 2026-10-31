"""Progress must follow evidence, including failure and cleanup boundaries."""
from pathlib import Path
import subprocess


def test_progress_retains_real_completions_and_explains_current_waits():
    script = Path(__file__).parents[1] / "src/agp_remote_yam/static/progress.js"
    source = r"""
const assert = require('node:assert/strict');
global.window = {};
require(process.argv[1]);
const describe = window.AgPProgress.describe;
const run = {id:'fixture', status:'queued', active:true, mode:'physical_api'};
const events = [];
let progress = describe(run,events);
assert.equal(progress.key,'join');
assert.deepEqual(progress.completed,['Run accepted']);
events.push({kind:'lifecycle',message:'Robot session queued'});
assert.equal(describe(run,events).key,'queue');
assert.match(describe(run,events).reason,/preparation/);
// Pre-admission preview images do not complete the leased-observation stage.
events.push({kind:'initial_observation'}, {kind:'capture',message:'Public preview'});
assert.ok(!describe(run,events).completed.includes('Fresh views received'));
events.push({kind:'lifecycle',message:'Robot session running'});
assert.equal(describe(run,events).key,'observe');
events.push({kind:'worker_profile',profile:{stage:'leased_images_accepted'}});
assert.equal(describe(run,events).key,'program');
events.push({kind:'motion_requested'});
progress=describe(run,events);
assert.equal(progress.key,'execute');
assert.ok(!progress.completed.includes('Movement measured'));
// A command request and a running status never fabricate physical completion.
run.status='running';
assert.equal(describe(run,events).key,'execute');
events.push({kind:'physical_motion_measured'});
assert.equal(describe(run,events).key,'verify');
events.push({kind:'agent_result'});run.outcome={status:'done'};
assert.equal(describe(run,events).key,'replay');
run.replay={status:'recording'};run.active=false;run.status='stopped';
assert.equal(describe(run,events).key,'replay');
run.replay.status='ready';
progress=describe(run,events);
assert.equal(progress.key,'finished');
assert.ok(progress.completed.includes('Replay ready'));
assert.equal(progress.completed.length,7);
// Errors retain completed stages but do not invent later ones.
const failure=describe({id:'failure',status:'failed',active:false,error:'Camera state is stale'},events.slice(0,3));
assert.equal(failure.key,'failed');
assert.equal(failure.recovery,true);
assert.deepEqual(failure.completed,['Run accepted']);
assert.match(failure.reason,/Camera state is stale/);
const mock=describe({...run,mode:'offline_mock'},events);
assert.match(mock.reason,/did not move a physical robot/);
"""
    subprocess.run(["node", "-e", source, str(script)], check=True, timeout=5)
