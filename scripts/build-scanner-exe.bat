@echo off
setlocal
set "PROJ=c:\Users\fkdhtk\Desktop\scan privado do samuca\Lodark AC (1)\Lodark AC"
set "OUT=%PROJ%\x64\Release\171ScreensAC.exe"
set "DEST=c:\Users\fkdhtk\Desktop\PUBLIC\171-screens-web\public\scanner\171-screens.exe"

for /f "usebackq delims=" %%i in (`"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe 2^>nul`) do set "MSBUILD=%%i"

if not defined MSBUILD (
  echo [ERRO] MSBuild nao encontrado. Instale Visual Studio com C++.
  exit /b 1
)

echo Compilando Release x64...
"%MSBUILD%" "%PROJ%\Samuca AC.vcxproj" /p:Configuration=Release /p:Platform=x64 /m
if errorlevel 1 exit /b 1

if not exist "%OUT%" (
  echo [ERRO] Exe nao gerado em %OUT%
  exit /b 1
)

if not exist "%DEST%\.." mkdir "%DEST%\.."
copy /Y "%OUT%" "%DEST%"
echo.
echo [OK] Copiado para public\scanner\171-screens.exe
echo Agora faca push/deploy na Vercel.
endlocal
