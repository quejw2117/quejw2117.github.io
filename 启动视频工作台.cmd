@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在启动视频内容工作台...
echo 启动后请打开 http://127.0.0.1:4317
pnpm.cmd content:studio
pause
