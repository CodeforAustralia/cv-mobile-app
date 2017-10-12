#!/bin/bash

cd /var/www/html/app-playground
rm -rf node_modules
npm install
pkill screen
