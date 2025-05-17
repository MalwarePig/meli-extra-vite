@echo off
:inicio
cls
echo.
echo =================================================
echo =                  MalwarePig                   =
echo =================================================
echo =================================================
echo =        Comandos cargados correctamente        =
echo =                                               =
echo =  1) Push client                               =
echo =  2) Push server                               =
echo =  3) Push proyect                               =
echo =  4) Salir                                     =
echo.
set /p opcion= Selecciona una opcion: 
echo.

if "%opcion%"=="1" goto client
if "%opcion%"=="2" goto server
if "%opcion%"=="3" goto proyect
if "%opcion%"=="4" goto salir

echo Opcion no valida. Intenta de nuevo.
pause
goto inicio

:client
cls
echo.
echo Ejecutando Push para la carpeta client...
cd "C:\Users\MAGI\Desktop\Proyectos\meli-extra-vite\client"
git add client
git commit -m "Actualización desde client"
git push -u origin main
echo.
echo Push completado para client.
pause
goto inicio

:server
cls
echo.
echo Ejecutando Push para la carpeta server...
cd "C:\Users\MAGI\Desktop\Proyectos\meli-extra-vite\server"
git add server
git commit -m "Actualización desde server"
git push -u origin main
echo.
echo Push completado para server.
pause
goto inicio

:proyect
cls
echo.
echo Ejecutando Push para la carpeta server...
cd "C:\Users\MAGI\Desktop\Proyectos\meli-extra-vite\"
git add .
git commit -m "Actualización desde proyect"
git push -u origin main
echo.
echo Push completado para server.
pause
goto inicio

:salir
echo Saliendo del programa...
exit