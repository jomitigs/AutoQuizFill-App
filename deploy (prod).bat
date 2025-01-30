@echo off
REM Asegurarnos de que empezamos en la carpeta del proyecto
cd /d "C:\Users\jomit\OneDrive\Documentos\GitHub\AutoQuizFill-App"

echo =========================================================================
echo Iniciando build con npm...
echo =========================================================================
call npm run build:prod
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] La construcción con npm ha fallado.
    pause
    exit /b %ERRORLEVEL%
)

echo =========================================================================
echo Agregando cambios a Git...
echo =========================================================================
call git add .

echo =========================================================================
echo Realizando commit...
echo =========================================================================
call git commit -m "AutoGuardado"

echo =========================================================================
echo Haciendo push al repositorio remoto...
echo =========================================================================
call git push origin main

echo =========================================================================
echo Proceso finalizado. Presiona una tecla para cerrar.
echo =========================================================================
pause
