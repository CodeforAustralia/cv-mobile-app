#!/bin/bash

cd /var/www/html/app-playground
npm install
pkill -9 node
rm stdout.txt
rm stderr.txt

cd /var/www/html/cv-staff-app
rm stdout.txt
rm stderr.txt
