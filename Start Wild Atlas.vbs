Option Explicit
Dim shell, files, folder, url, request, ready, attempt
Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")
folder = files.GetParentFolderName(WScript.ScriptFullName)
url = "http://127.0.0.1:4178"
If Not files.FileExists(folder & "\dist\index.html") Then
  MsgBox "The built editor is missing from the dist folder. Please restore the complete Wild Atlas folder.", 16, "Wild Atlas"
  WScript.Quit 1
End If
Function IsReady()
  On Error Resume Next
  Dim check
  Set check = CreateObject("MSXML2.ServerXMLHTTP.6.0")
  check.setTimeouts 300, 300, 300, 300
  check.open "GET", url & "/__wild_atlas_health", False
  check.send
  IsReady = False
  If Err.Number = 0 Then IsReady = (check.status = 200 And check.responseText = "wild-atlas-local-v1")
  Err.Clear
End Function
If Not IsReady() Then
  On Error Resume Next
  shell.CurrentDirectory = folder
  shell.Run "node.exe """ & folder & "\launcher\server.mjs""", 0, False
  If Err.Number <> 0 Then
    MsgBox "Wild Atlas could not start Node.js. Node.js must be installed to run this copy of the editor.", 16, "Wild Atlas"
    WScript.Quit 1
  End If
  On Error GoTo 0
End If
ready = False
For attempt = 1 To 40
  If IsReady() Then
    ready = True
    Exit For
  End If
  WScript.Sleep 250
Next
If Not ready Then
  MsgBox "Wild Atlas could not start. Port 4178 may be occupied, or Node.js may be unavailable. No terminal commands are needed; try restarting your computer and double-clicking this launcher again.", 16, "Wild Atlas"
  WScript.Quit 1
End If
shell.Run url, 1, False
