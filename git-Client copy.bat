@echo off
:inicio
echo.
echo =================================================
echo =                  MalwarePig                   =
echo =================================================
echo =================================================
echo =        Comandos cargados correctamente        =
echo =						     =
echo = 						     =
echo =	1)Ejecutar sistema  			     =
echo =	2)Deter Servicios    			     =
echo =	3)Salir    			     =
echo.
set/p opcion= Selecciona una opcion...
echo.
cls
echo.
if %opcion%==1 goto Client 
if %opcion%==2 goto Server
else goto detener
:detener
echo.
echo Deteniendo servicios!!
cd "C:\Users\MAGI\Desktop\Proyectos\meli-extra-vite"
call Stop.bat
echo.
echo continuar?..
pause
cls
goto inicio
:Client
echo.
echo Ejecutando!!
git init
git add client
git commit -m "first commit"
git branch -M main
git push -u origin main
echo continuar?..

:Server
echo.
echo Ejecutando!!
git init
git add server
git commit -m "push server"
git branch -M main
git push -u origin main
echo continuar?..