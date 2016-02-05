Do following steps:

-Create and setup your git account 

https://help.github.com/articles/set-up-git/

-Configure and run setup.sh

!Note setup.sh is configured for ubuntu system, you may configure it for whichever system you are working on


Otherwise: 
-Install MongoDB depending on the system which you use

-Install Node.js

-Install Express.js

-Iterm and Sublime Text (individually)


-Send me notification to join Qolart organization or fork my repo on https://github.com/qolart/qolart/

!Note each of you will work on his branch but pulling and push request from master branch
setup.sh file has basic installation instructions to run the project


-After successful installation and downloading:

On your terminal:
$mongod -port 27017 //will run mongo database

On a separate tab, navigate to the project directory:

$npm install -g nodemon 

$cd qolart

$npm install  // this will install dependencies

$nodemon bin/www //this will run the project

Open localhost:9000

