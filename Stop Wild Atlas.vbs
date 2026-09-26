Option Explicit
Dim request
On Error Resume Next
Set request = CreateObject("MSXML2.ServerXMLHTTP.6.0")
request.setTimeouts 500, 500, 500, 500
request.open "POST", "http://127.0.0.1:4178/__wild_atlas_stop", False
request.setRequestHeader "X-Wild-Atlas-Launcher", "stop"
request.send
MsgBox "The Wild Atlas background server is stopped. You can close its browser tab.", 64, "Wild Atlas"
