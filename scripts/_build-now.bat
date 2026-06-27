@echo off
call "C:\Program Files\Microsoft Visual Studio\18\Community\Common7\Tools\VsDevCmd.bat" -arch=amd64 -host_arch=amd64
if errorlevel 1 exit /b 1
set "PROJ=c:\Users\fkdhtk\Desktop\scan privado do samuca\Lodark AC (1)\Lodark AC"
set "OUT=%PROJ%\x64\Release\171ScreensAC.exe"
set "DEST=c:\Users\fkdhtk\Desktop\PUBLIC\171-screens-web\public\scanner\171-screens.exe"
"C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Current\Bin\MSBuild.exe" "%PROJ%\Samuca AC.vcxproj" /p:Configuration=Release /p:Platform=x64 /m /v:minimal
if errorlevel 1 exit /b 1
if not exist "%OUT%" (
  echo [ERRO] Exe nao gerado
  exit /b 1
)
copy /Y "%OUT%" "%DEST%"
echo [OK] %DEST%
exit /b 0
