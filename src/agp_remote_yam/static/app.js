"use strict";
const $ = id => document.getElementById(id);
let stopCameras=null;
let config, activeRun = null, selected = null, cursor = -1, rows = [], polling = false, fileListKey = "", terminalHistoryKey = "";
let initialized=false, launchPending=false, progressState=null, progressKey="", progressSince=Date.now(), lastContact=Date.now();
const terminal = new Set(["completed", "succeeded", "stopped", "timed_out", "failed", "disconnected", "safety_aborted", "interrupted", "resetting"]);
async function api(path, value) {
  const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),12000);
  try {
    const response = await fetch(path, {signal:controller.signal,...(value === undefined ? {} : {method:"POST", headers:{"Content-Type":"application/json", "X-CSRF-Token":config.csrf}, body:JSON.stringify(value)})});
    let result;try{result=await response.json();}catch{throw new Error("The server response was incomplete. Refresh status to check the run.");}
    if (!response.ok) {const exc=new Error(result.error || "The request could not be completed");exc.httpStatus=response.status;throw exc;}
    return result;
  } catch(exc) {if(exc.name==="AbortError")throw new Error("No server response was received within 12 seconds");throw exc;}
  finally{clearTimeout(timeout);}
}
function error(message) { $("error").textContent = message || ""; $("error").hidden = !message; }
function setProgress(state){
 if(state.key!==progressKey){progressKey=state.key;progressSince=Date.now();}
 progressState=state;$("run-progress").dataset.stage=state.key;$("progress-title").textContent=state.title;$("progress-reason").textContent=state.reason;
 const completed=$("progress-completed");completed.replaceChildren();for(const label of state.completed||[]){const item=document.createElement("li");item.textContent=label;completed.append(item);}completed.hidden=!completed.childElementCount;
 $("refresh-status").hidden=!state.recovery;$("progress-wait").hidden=true;
}
function showRunProgress(run,events){lastContact=Date.now();setProgress(AgPProgress.describe(run,events));}
function controlButtons(){ $("run").disabled=!initialized||launchPending||!!activeRun;$("stop").disabled=!activeRun;$("robot-select").disabled=!!activeRun||launchPending; }
function modeLabel(run){return run.execution_mode==="automated_test"?"automated test":run.execution_mode==="system"?"system execution":run.execution_mode==="interactive"?"interactive":"";}
function attribution(run){return [run.approach||"Agent as Policy",run.runner?.name||"Unattributed legacy run",modeLabel(run)].filter(Boolean).join(" · ");}
function displayStatus(run){return run.error?"Failed":terminal.has(run.status)&&!run.active&&run.outcome?.status==="done"?"Agent finished":run.status.replaceAll("_"," ");}
function timingLabel(run){
 if(run.mode==="offline_mock")return "Mock robot · no physical execution";
 const timing=run.timing||{};
 if(timing.run_to_motion_s!=null)return "Measured movement completed "+timing.run_to_motion_s.toFixed(1)+" s after Run. Visual onset timing is unverified.";
 if(terminal.has(run.status)&&!run.active)return "Ended with no verified method-driven movement.";
 const elapsed=Math.max(0,Date.now()/1000-(timing.run_clicked_at||run.created_at));
 return "Waiting for measured method-driven movement · "+Math.floor(elapsed)+" s since Run. Queue and agent work appear below.";
}
function clearRun(id) { selected=id; cursor=-1; rows=[]; fileListKey=""; terminalHistoryKey=""; $("events").replaceChildren(); $("outcome").hidden=true; $("code").hidden=true; $("replay-panel").hidden=true; $("run-replay").pause(); $("run-replay").removeAttribute("src"); delete $("run-replay").dataset.run; $("review-status").textContent="Loading selected run, activity and saved files…";$("file-status").textContent="";error(""); }
function eventRow(event) {
  const node = document.createElement("article"); node.className="event " + (event.kind==="error"?"error":"");
  const label=document.createElement("div");label.className="event-label";label.textContent=event.kind.replaceAll("_"," ").toUpperCase();
  const text=document.createElement("p");text.textContent=event.message;node.append(label,text);
  if (event.arguments || event.response || event.result) { const details=document.createElement("details"), summary=document.createElement("summary"), pre=document.createElement("pre");summary.textContent="Inspect details";pre.textContent=JSON.stringify(event.arguments||event.response||event.result,null,2);details.append(summary,pre);node.append(details); }
  return node;
}
function fileURL(name) { return "/api/runs/"+selected+"/files/"+name.split("/").map(encodeURIComponent).join("/"); }
function renderFiles(names) {
  const key=selected+JSON.stringify(names);if(key===fileListKey)return;fileListKey=key;
  $("file-count").textContent=names.length+" files";
  const fragment=document.createDocumentFragment();
  for (const name of names) { const button=document.createElement("button");button.className="file";button.textContent=name;button.type="button";button.onclick=async()=>{if(/\.(py|md|json)$/.test(name)){
    const identity=selected,controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);$("file-status").textContent="Opening "+name+"…";
    try{const response=await fetch(fileURL(name),{signal:controller.signal});if(!response.ok)throw new Error("File could not be read");const text=await response.text();if(identity!==selected)return;$("code").textContent=text;$("code").hidden=false;$("file-status").textContent=name+" loaded.";}
    catch{if(identity===selected)$("file-status").textContent="Could not load "+name+". Select the file again to retry.";}finally{clearTimeout(timeout);}
  }else window.open(fileURL(name),"_blank","noopener");};fragment.append(button); }
  $("files").replaceChildren(fragment);
}
async function history() {
  $("history-status").textContent="Loading your saved runs and checking for an active run…";$("refresh").disabled=true;
  let result;try{result=await api("/api/runs");}catch(exc){$("history-status").textContent="History could not load. Refresh run history to try again.";throw exc;}finally{$("refresh").disabled=false;}
  activeRun=result.runs.find(x=>x.active||!terminal.has(x.status))?.id||null; const old=$("experience").value;
  $("history").replaceChildren();$("experience").replaceChildren(new Option("Fresh start",""));
  for (const run of result.runs) { const button=document.createElement("button");button.className="history-item";const title=document.createElement("strong"),meta=document.createElement("small");title.textContent=run.task;meta.textContent=attribution(run)+" · "+displayStatus(run)+" · "+new Date(run.created_at*1000).toLocaleString();button.append(title,meta);button.onclick=()=>{clearRun(run.id);poll();};$("history").append(button);if(terminal.has(run.status))$("experience").add(new Option(run.task.slice(0,35),run.id)); }
  if ([...$("experience").options].some(x=>x.value===old))$("experience").value=old;
  $("history-status").textContent=result.runs.length?"Saved runs loaded. Select a run to review it.":"No saved runs in this browser yet.";
  return result.runs;
}
async function poll() {
  if (!selected || polling) return; polling=true;
  try {
    const identity=selected, run=await api("/api/runs/"+identity+"?after="+cursor);
    if(identity!==selected)return;
    $("phase").textContent=displayStatus(run);$("run-title").textContent=run.task;
    const finished=terminal.has(run.status)&&!run.active;
    const controlled=activeRun&&activeRun!==identity?await api("/api/runs/"+activeRun):run;
    if(identity!==selected)return;
    if(controlled.active)activeRun=controlled.id;
    else if(terminal.has(controlled.status)&&activeRun===controlled.id)activeRun=null;

    $("run-attribution").textContent=attribution(controlled)+" · "+(controlled.robot_id||config.robot_id)+" · "+displayStatus(controlled);
    $("run-timing").textContent=timingLabel(controlled);
    renderReplay(run);
    controlButtons();$("stop").textContent=activeRun&&activeRun!==identity?"Stop active run":"Stop run";
    const nearBottom=$("events").scrollTop+$("events").clientHeight>=$("events").scrollHeight-60;
    for(const event of run.events){rows.push(event);$("events").append(eventRow(event));cursor=event.id;}
    showRunProgress(controlled,controlled.id===identity?rows:controlled.events);$("review-status").textContent=controlled.id===identity?"":"Reviewing "+attribution(run)+". The run controls apply to the active run.";
    if(nearBottom)$("events").scrollTop=$("events").scrollHeight;
    $("event-count").textContent=rows.length+" events";renderFiles(run.files);
    if(run.error)error(run.error);
    if(run.outcome){$("outcome").replaceChildren();const message=document.createElement("div"),scope=document.createElement("small");message.textContent=run.outcome.summary;scope.textContent=config.mode==="offline_mock"?(config.agent==="scripted"?"Mock transport verification only. No model inference or physical robot.":"Real model, mock robot. No physical task validation."):"Agent-declared outcome. Review captures and evidence before judging task success.";$("outcome").append(message,scope);$("outcome").hidden=false;}
    const historyKey=selected+run.status+"|"+(activeRun||"");if(finished&&terminalHistoryKey!==historyKey){terminalHistoryKey=historyKey;await history();}
  } catch(exc){$("review-status").textContent="Run details could not update. Refresh status to reconnect.";setProgress({key:"connection",title:"Run status connection interrupted",reason:exc.message+" The robot may still be running. Refresh status to reconnect; Stop remains available for the active run.",completed:progressState?.completed||[],recovery:true});}finally{polling=false;}
}
$("task-form").addEventListener("submit",async event=>{
  event.preventDefault();const runClickedAt=Date.now()/1000;if(launchPending||activeRun)return;error("");launchPending=true;controlButtons();$("phase").textContent="Submitting";setProgress({key:"submit",title:"Sending your run request",reason:"Saving the task and confirmed runner, then joining the robot’s normal queue.",completed:[]});
  try{let goal=null;const file=$("goal").files[0];if(file)goal=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
    const run=await api("/api/runs",{task:$("task").value,duration_s:Number($("duration").value),experience_run:$("experience").value||null,goal_image:goal,robot_id:config.robot_id,runner:runner(),execution_mode:$("execution-mode").value,timing:{page_entered_at:performance.timeOrigin/1000,run_clicked_at:runClickedAt}});saveIdentity();activeRun=run.id;launchPending=false;clearRun(run.id);controlButtons();setProgress({key:"join",title:"Joining the robot queue",reason:"Your run was accepted. Waiting for robot admission and normal safety preparation.",completed:["Run accepted"]});await poll();history().catch(exc=>error(exc.message));
  }catch(exc){
    const rejected=exc.httpStatus>=400&&exc.httpStatus<500&&exc.httpStatus!==408;
    if(rejected)launchPending=false;
    $("phase").textContent=rejected?"Not started":"Launch unconfirmed";
    setProgress({key:rejected?"rejected":"launch-unconfirmed",title:rejected?"Run was not accepted":"Launch could not be confirmed",reason:exc.message+(rejected?". Correct the inputs, then choose Run again. Refresh status to check existing runs.":" Refresh status before starting another run, so an accepted request is not submitted twice."),completed:[],recovery:true});controlButtons();
  }
});
$("stop").onclick=async()=>{if(!activeRun)return;const target=activeRun;$("stop").disabled=true;setProgress({key:"stopping",title:"Stopping the active run",reason:"Requesting robot Stop and normal lease release. Waiting for confirmation.",completed:progressState?.completed||[]});try{await api("/api/runs/"+target+"/stop",{});await poll();}catch(exc){setProgress({key:"stop-unconfirmed",title:"Stop has not been confirmed",reason:exc.message+" Refresh status and check the live arms; use Stop again if the run remains active.",completed:progressState?.completed||[],recovery:true});controlButtons();}};
$("refresh-status").onclick=async()=>{if(!config){await init();return;}setProgress({key:"reconnect",title:"Checking run status",reason:"Reading your saved runs to find the active session. This does not start or retry motion.",completed:progressState?.completed||[]});try{const runs=await history();launchPending=false;initialized=true;const current=runs.find(x=>x.active||!terminal.has(x.status));if(current&&selected!==current.id)clearRun(current.id);if(selected)await poll();else setProgress({key:"ready",title:"Ready for your task",reason:"Confirm your name and email, then choose Run. No active run was found.",completed:[]});controlButtons();}catch(exc){setProgress({key:"connection",title:"Status is still unavailable",reason:exc.message+" Refresh status to try again. A previous request may still be active.",completed:progressState?.completed||[],recovery:true});}};
$("refresh").onclick=()=>history().catch(exc=>error(exc.message));
$("goal").onchange=()=>{const file=$("goal").files[0];$("goal-preview").hidden=!file;if(file)$("goal-preview").src=URL.createObjectURL(file);};
async function init(){try{const requestedRobot=new URLSearchParams(location.search).get("robot_id");config=document.getElementById("initial-config")?JSON.parse(document.getElementById("initial-config").textContent):await api("/api/config"+(requestedRobot?"?robot_id="+encodeURIComponent(requestedRobot):""));$("robot-select").replaceChildren(...config.robots.map(x=>new Option(x.name,x.id)));$("robot-select").value=config.robot_id;$("mode").textContent=config.camera_source==="synthetic"?"Synthetic cameras":config.mode==="offline_mock"?"Live cameras · mock robot":"Live cameras · API robot";$("mode").classList.toggle("mock",config.mode==="offline_mock");$("robot").textContent=config.robot_id;$("model").textContent=config.agent==="scripted"?"Scripted agent · no model usage":config.model+" · Agent as Policy";if(config.mode==="offline_mock")$("task").value="Demonstrate the offline agent → API controller loop.";stopCameras=AgPCameras.start(config);station();setInterval(station,10000);const runs=await history();const current=runs.find(x=>x.active||!terminal.has(x.status));activeRun=current?.id||null;const requestedRun=new URLSearchParams(location.search).get("run");if(current||requestedRun){clearRun(current?.id||requestedRun);await poll();}else setProgress({key:"ready",title:"Ready for your task",reason:"Confirm your name and email, then choose Run. Live cameras are shown alongside the task.",completed:[]});initialized=true;controlButtons();}catch(exc){setProgress({key:"load-failed",title:"Workspace could not finish loading",reason:exc.message+" Refresh status to check your existing runs before starting a task.",completed:[],recovery:true});}}
$("robot-select").onchange=async()=>{
 try{config=await api("/api/config?robot_id="+encodeURIComponent($("robot-select").value));$("robot").textContent=config.robot_id;stopCameras?.();stopCameras=AgPCameras.start(config);station();}
 catch(exc){error(exc.message);}
};
let checkingStation=false;
async function station(){
 if(checkingStation)return;checkingStation=true;
 try{const status=await api("/api/station?robot_id="+encodeURIComponent(config.robot_id));$("station-state").textContent=status.message;$("station-dot").style.background=status.connected?"#547766":"#9b6b37";}
 catch{$("station-state").textContent="Robot connection could not be checked";}finally{checkingStation=false;}
}
function runner(){return {kind:"human",name:$("runner-name").value.trim(),email:$("runner-email").value.trim()};}
function saveIdentity(){try{localStorage.setItem("agp-runner",JSON.stringify(runner()));}catch{}}
function initIdentity(){
 if(new URLSearchParams(location.search).get("automated")==="1")$("execution-mode").value="automated_test";
 try{const prior=JSON.parse(localStorage.getItem("agp-runner")||"null");if(prior?.kind==="human"){$("runner-name").value=prior.name||"";$("runner-email").value=prior.email||"";}}catch{}
}
function renderReplay(run){
 const replay=run.replay;$("replay-panel").hidden=!replay;
 if(!replay)return;
 $("replay-state").textContent=replay.status.replaceAll("_"," ");
 $("replay-note").textContent=replay.note||"Retained footage is associated with this method, runner and run. It is not an independent task-success verdict.";
 const video=$("run-replay");if(replay.url&&video.dataset.run!==run.id){video.src=replay.url;video.dataset.run=run.id;}
 video.hidden=!replay.url;
}
initIdentity();
init();
setInterval(poll,800);
setInterval(()=>{if(!activeRun&&!launchPending)return;const age=Math.floor((Date.now()-progressSince)/1000);if(age>=20){$("progress-wait").textContent="This stage has not changed for "+age+" seconds. Check the live view; Stop ends the active run. Refresh status if the connection is unavailable.";$("progress-wait").hidden=false;$("refresh-status").hidden=false;}if(Date.now()-lastContact>15000&&activeRun)$("refresh-status").hidden=false;},1000);
const replayVideo=$("run-replay");
for(const event of ["loadstart","waiting","stalled"])replayVideo.addEventListener(event,()=>{if(replayVideo.dataset.run){$("replay-playback-status").textContent=event==="loadstart"?"Loading actual recorded footage…":"Playback is waiting for recorded video data. It will continue when data is available.";$("retry-replay").hidden=false;}});
replayVideo.addEventListener("loadeddata",()=>{$("replay-playback-status").textContent="Replay loaded. Press Play to review this run.";$("retry-replay").hidden=true;});
replayVideo.addEventListener("playing",()=>{$("replay-playback-status").textContent="Playing this run’s retained camera footage.";$("retry-replay").hidden=true;});
replayVideo.addEventListener("error",()=>{$("replay-playback-status").textContent="Replay could not load. Reload the replay to try again.";$("retry-replay").hidden=false;});
$("retry-replay").onclick=()=>{replayVideo.load();};
