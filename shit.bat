for /d %%i in (
    C:\Users\sgs08\IdeaProjects\exam\haulmont-test-task-frontend\src\view\main\credits\*
) do (
    copy /y %%i\index.jsx %%i\..\%%~nxi.jsx
)