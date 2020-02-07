# User Logger

# Prerequisite

- NodeJS
- NPM
- MongoDB
- Postman
# Node
- Node installation on Windows
 - Just go on official Node.js website and download the installer.
- Node installation on Ubuntu

 - You can install nodejs and npm easily with apt install, just run the following commands.

    - $ sudo apt install nodejs
    - $ sudo apt install npm

- Other Operating Systems
 - You can find more information about the installation on the official Node.js website and the official NPM website.

    If the installation was successful, you should be able to run the following command.

    $ node --version $ npm --version

If you need to update npm, you can make it using npm! Cool right? After running the following command, just open again the command line and be happy.

$ npm install npm -g

# MongoDB

MongoDB installation on Ubuntu

$ sudo apt update
$ sudo apt install -y mongodb

First, check the service’s status:

$ sudo systemctl status mongodb

Start the server,

$ sudo systemctl status mongodb
$ mongo

Stop the serve,

$ sudo systemctl stop mongodb

# Install

- git clone  https://github.com/vijayshreem-cuelogic/user_logger.git
- npm start
# Database Backup 
Run
- ./backup.sh


