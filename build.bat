call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat"

set PROJECT_NAME=snake
set OUTPUT_FOLDER=release

mkdir %OUTPUT_FOLDER%
cd .\%OUTPUT_FOLDER%

cl ^
    /I"C:\Libraries\SDL2-2.0.22\include" ^
    /I"..\include" ^
    /Fe".\%PROJECT_NAME%" ^
    ../src/*.cpp ^
/link ^
    /LIBPATH:"C:\Libraries\SDL2-2.0.22\lib\x64" ^
    /SUBSYSTEM:CONSOLE ^
    user32.lib shell32.lib SDL2.lib SDL2main.lib

del *.obj

..\%OUTPUT_FOLDER%\%PROJECT_NAME%.exe
