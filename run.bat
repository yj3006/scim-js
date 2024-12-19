@ECHO OFF

REM Credentials for basic mode.
SET ADMINUSER=admin
SET ADMINPASS=
REM Token for bearer mode.
SET BEARER_TOKEN=
REM Client ID and Client Secret for client_credentials and resource_owner mode.
SET CLIENT_ID=
SET CLIENT_SECRET=
SET PORT=6355

REM setting DEBUG_LOGIN to true will enable logging both in node.js and
REM in your web browser's JavaScript console.
REM this setting is intended for development and debugging purposes and shouldn't
REM be turned on in production
SET DEBUG_LOGIN=true

REM Define which method the SCIM gateway uses to validate authentication.
REM If none defined, then basic is selected as default value.
REM Options are basic, bearer, client_credentials, or resource_owner. 
REM MODE=basic

WHERE >nul 2>nul npm
IF %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js not installed
) ELSE (
  IF NOT EXIST ".\node_modules" (
    echo INFO: Required node.js modules are missing! Installing them now...
    npm install
    IF ERRORLEVEL 1 (
      IF EXIST ".\node_modules" RMDIR /S /Q .\node_modules
      ECHO ERROR: npm cannot get the required node.js modules!
      ECHO ERROR: If you need a proxy to reach the internet configure npm to use it with:
      ECHO ERROR:   npm config set proxy="<proxy_url>"
      ECHO ERROR:   npm config set https-proxy="<proxy_url>"
    )
  )

  IF NOT ERRORLEVEL 1 npm start
)
