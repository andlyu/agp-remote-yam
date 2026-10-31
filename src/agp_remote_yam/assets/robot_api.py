"""Optional Python convenience wrapper around the unchanged upstream CLI.

No targets, motion plans, retries, hardware access or task logic live here.
Run generated programs with PYTHONPATH=. python3 scratch/program.py.
"""
from contextlib import redirect_stdout
import io
import json
from pathlib import Path
import re
import sys
import threading
import robot_client

ROOT = Path(__file__).resolve().parent
_LOCK = threading.RLock()


def request(command, arguments=None, *, arm="left"):
    if arm not in ("left", "right"):
        raise ValueError("Choose left or right")
    # Invoke the unchanged CLI entry point in this process. Its protocol,
    # timeout and sequence allocation remain authoritative. Serialise calls
    # because the upstream CLI takes argv and writes one stdout response.
    with _LOCK:
        previous = sys.argv
        output = io.StringIO()
        try:
            sys.argv = [str(ROOT / "robot_client.py"), str(ROOT), "--arm", arm,
                        command, json.dumps(arguments or {})]
            with redirect_stdout(output):
                returncode = robot_client.main()
        finally:
            sys.argv = previous
        value = json.loads(output.getvalue())
    if returncode or not value.get("ok"):
        raise RuntimeError(value)
    return value


def once(name, command, arguments=None, *, arm="left"):
    """Record one attempted command, including failure/timeout; never replay it."""
    if not isinstance(name, str) or not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", name):
        raise ValueError("Use a simple unique action name")
    with (ROOT / "scratch" / ("attempted_" + name)).open("x") as marker:
        marker.write("One attempt; never automatically retry.\n")
    return request(command, arguments, arm=arm)
