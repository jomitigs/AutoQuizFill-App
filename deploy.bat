@echo off
REM Cambia a la carpeta de tu proyecto
cd /d C:\ruta\de\tu\proyecto

REM Agregar todos los cambios
git add .

REM Hacer commit con un mensaje automático
git commit -m "Actualización automática del script"

REM Subir los cambios al repositorio remoto
git push origin main

REM Pausa para mostrar errores (si los hay)
pause
