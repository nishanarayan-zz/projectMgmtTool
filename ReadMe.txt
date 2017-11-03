Installation Instructions
-------------------------
1) Install Node.js in your local machine.
   Windows:
   (i)  Download the windows binary (.exe) from https://nodejs.org/en/download/
   (ii) Run the set-up (.exe) and install Nodejs at C:\Program Files\nodejs
   (iii) Add the location 'C:\Program Files\nodejs\' to the PATH environment variable.
   (iv) Add the location 'C:\Users\Nisumuser\AppData\Roaming\npm\' to the PATH environment variable,
        for installing node modules globally.  
   MAC :
   (i)  Download the macOS Binaries (.pkg) from https://nodejs.org/en/download/
   (ii) Run the .pkg file (double-click) and complete the nodejs installation. 
   (iii) Nodejs will be installed at /usr/local/bin/node and npm will be installed at /usr/local/bin/npm .
   (iv) Edit the .bash_profile file located at $HOME/.bash_profile , with the below syntax .
        export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/bin/node:/usr/local/bin/npm:$PATH , using Terminal.  
   (v)  If the .bash_profile is not located in the $HOME directory, create one using the following command in Terminal.
        >vi .bash_profile and save the file with the :wq command after adding the PATH variable.
   (vi) To verify if Nodejs was installed properly type the following command in Terminal.
        >node -v
       You should see the nodejs version displayed in the output. 
   
2) Install MongoDB in your local machine. 
  Windows
   (i) Download the windows binary (.exe) or installer from https://www.mongodb.com/
   (ii) Run the set-up (.exe) and install mongoDB at C:\Program Files\mongoDB 
   (iii) Create the following folders in the paths below
        a)C:\mongodb
        b)C:\mongodb\log
        c)C:\mongodb\data
        d)C:\mongodb\data\db
   (iv) Create the following file, in the path below, and save it with extension .config   
        C:\mongodb\mongo.config
   (v)  Add the following lines in the mongo.config file, created in the above step. 
        Do not include any spaces before and after each line. 
        dbpath=c:\MongoDB\data\db\
        port = 27017
        logpath=c:\MongoDB\log\mongo.log
   MAC
    (i) Navigate to the download center from https://www.mongodb.com/ by clicking on the download button on the 
        top right corner. 
    (ii) Download the mongodb-osx-x86_64-3.2.11.tgz file for OSX. (3.2.11 or latest version) 
    (iii) Extract the files from the downloaded archive by executing the following command from Terminal 
         > tar -zxvf mongodb-osx-x86_64-3.2.11.tgz
    (iv) Rename the extracted folder to 'mongodb' . 
    (v) Copy the folder and place it in /Applications/mongodb from the GUI.
    (vi) Edit the .bash_profile file located at $HOME/.bash_profile , with the below syntax .
        export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/bin/node:/usr/local/bin/npm:/Applications/mongodb/bin:$PATH , using Terminal.  
    (vii) Navigate to /Applications/mongodb from 'Finder' and create the following directories from the GUI.
         /Applications/mongodb/data 
         /Applications/mongodb/data/db
    (viii) Set read-write permissions for the data directory, by executing the following commands in Terminal.
        > cd /Applications/mongodb 
        > chmod -R 777 data
        > chmod -R 777 data/db

3) Start the Database server.
  Windows
   (i) Navigate to the path below and run the following command, from the command prompt.  
       c:\program files\mongodb\server\3.2\bin>mongod --config c:\mongodb\mongo.config   (hit enter)
       (Input either 3.2 or 3.4 in the path, depending on the mongoDB version you have installed.)
   (ii) If the command executed successfully, you will observe a blank prompt . If it failed, you can
        observe the error in the command prompt or from the log present at logpath=c:\MongoDB\log\mongo.log .
  MAC
   (i) Run the following command from Terminal, at the system prompt. 
     >mongod --dbpath /Applications/mongodb/data/db
   (ii) If the command executed successfully, you will observe the following output.
       [initandlisten] waiting for connections on port 27017

4) Managing the database .
  Windows
   (i) After starting the DB server, navigate to the path below and run the following command, from the command prompt.
       c:\program files\mongodb\server\3.2\bin>mongo  (hit enter) . You will notice the below output.
       output:
       ------   
        MongoDB shell version: 3.2.7
        connecting to: test
        >

   (ii) Run the following command to connect to the Hrm database.
        mongo>use Hrm
   (iii) All other commands for database operations can be found at https://docs.mongodb.com/manual/  
  MAC
   (i) After starting the DB server, open another Terminal window simultaneously by executing  (command + T) from the running Terminal.
   (ii) Execute the following command from the new Terminal window, at the system prompt.
      > mongo
       You will notice the following output
       output:
       ------   
        MongoDB shell version: 3.2.7
        connecting to: test
        > 
   (iii) All other commands for database operations can be found at https://docs.mongodb.com/manual/ 
    
5) Windows
   Unzip the projectMatrix compressed file into any desired location in your
   local machine.
   MAC
   Unzip the projectMatrix compressed file and place it at /Applications/projectMatrix

6) Windows
   Browse to the project folder (e.g: c:\users\userName\projectMatrix ) from the
   command prompt and start the Node server using below command.
   c:\users\userName\projectMatrix> Node Server
   MAC 
   Browse to the project folder (/Applications/projectMatrix) from the
   system prompt at Terminal and start the Node server using below commands
   >cd /Applications/projectMatrix
   >Node Server

7) Windows and MAC
  Open a web browser (css applied for Chrome and Safari ) and type in the following url in the address bar.
   http://localhost:5000/views/#/login , to begin the application.

8) Windows and MAC
   All console.log() outputs from Server.js are printed in the command prompt / Terminal that
   is running the Node server. 

9) Windows and MAC
  Database operation errors are also printed to the command prompt / Terminal  that is running
   the Node server.

10) Installing new Node modules
   (i) Navigate to the project folder and run the following command.
      Windows
       c:\users\userName\projectMatrix>npm install module_name
       The module will be installed at the below location.
       c:\users\userName\projectMatrix\node_modules\module_name
      MAC
       >cd /Applications/projectMatrix
       >npm install module_name
       The module will be installed at the below location.
         /Applications/projectMatrix/node_modules/module_name
       
   (ii) If a module needs to be utilized by more than one project or angular module, run the following command, 
        to globally install the node module.
      Windows
       c:\users\userName\projectMatrix>npm install -g module_name
       The module will be installed at the below location. 
       c:\Users\userName\AppData\Roaming\npm\node_modules
      MAC
       >cd /Applications/projectMatrix
       >sudo npm install -g module_name  (enter system login password when prompted)
       The module will be installed at the below location.
       /usr/local/lib/node_modules     

11) Adding module dependencies for newly installed Node modules.
   Windows and MAC
   (i) Set the path to the required javascript file inside the node module folder, in the index.html file. 
   (ii) Navigate to the app.js file and add the node_module dependency in the angular module declaration step. 

12) Utilize any html-css-javascript editor like EditPlus to modify the files for the
   excercises.You may also download eclipse from https://eclipse.org/downloads/ .
   (i) Right click on the individual file and open with any editor or IDE like eclipse,
       to make modifications.
   (ii) Creation of a new project from a menu in an IDE is not neccessary. 


13. Creation of tables in the MongoDB database.
 Windows
  (i)  Run the following commands in the mongo shell, after navigating to the path below.
   c:\program files\mongodb\server\3.2\bin> mongo
 MAC
  (i)  Run the following commands in the system prompt from a new Terminal window, after starting the DB server.
    > mongo

Execute the following commands, that are common to both Windows and MAC.

>use Hrm
>db.createCollection(“Project” , {size:2147483648}) 
>db.createCollection(“User” , {size:2147483648}) 
>db.createCollection(“UserProfile” , {size:2147483648}) 
     (Allocating 2GB for each of the tables. You may reduce the size if required.)

(ii) Create the following indexes, by running the following commands. 
> db.Project.createIndex({PersonId:1,ProjectName:1}, {unique:true})
> db.Project.createIndex({_id:1,ProjectName:1},{unique:true})
> db.Project.createIndex({_id:1,PersonId:1},{unique:true})
> db.UserProfile.createIndex({_id:1,Username:1}, {unique:true})
> db.UserProfile.createIndex({Username:1}, {unique:true})
> db.User.createIndex({Username:1}, {unique:true})
> db.User.createIndex({_id:1,Username:1}, {unique:true})


14. Creation of First user - Admin.
 Windows and MAC
 (i) Navigate directly to the path below, from chrome or Safari and click on the ‘Add User’ button. 
     http://localhost:5000/views/#/admin 
     Enter profile details and enter 'admin' (lowercase) for the role. 
 (ii)For subsequent creation of users, log in to the application 
   as the newly created ‘Admin’  and click on the ‘Add User’ button in the ‘Admin View’ .
     Enter profile details and enter 'user' (lowercase) for the role. 
    

15. Excercises
  (i) Excercise location - /Excercise.txt . Simple excercises to make modifications to existing
     files written in angularJS, HTML5 and CSS3 .

