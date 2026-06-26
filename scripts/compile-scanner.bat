@echo off
setlocal
call "C:\Program Files\Microsoft Visual Studio\18\Community\Common7\Tools\VsDevCmd.bat" -arch=amd64 -host_arch=amd64
if errorlevel 1 exit /b 1

set "PROJ=c:\Users\fkdhtk\Desktop\scan privado do samuca\Lodark AC (1)\Lodark AC\Samuca AC.vcxproj"
"C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Current\Bin\MSBuild.exe" "%PROJ%" /p:Configuration=Release /p:Platform=x64 /m /v:minimal
exit /b %ERRORLEVEL%
