#!/bin/bash

cd /home/ubuntu/app-playground
sudo rm -rf node_modules
npm install
npm run build
npm run clean