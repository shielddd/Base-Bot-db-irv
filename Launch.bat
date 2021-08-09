@echo off
title irv

if exist node_modules\ (
  echo déja installer 
  echo 
) else (
  call npm i >> NUL
  echo Installer
  echo re essaie bouffon
)
