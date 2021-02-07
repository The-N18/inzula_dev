# Environment & Tech
- Python 3.6.9
- Nodejs v10.9.0

# Terminology
+ Django – The backend framework used

+ DjangoRestFramework - The module that provides interfaces to create REST APIs

+ MySQL, PostgreSQL, SQLite

+ SQL – when referring to SQL

+ Python – the programming language used

+ model – Django class that interacts with database tables

+ SPA - Single Page Application

+ template – Django html file to represent a page. For the case of this SPA, we only have one template.

+ view – Django function/class that provides a given functionality

+ DDL - Data Definition language

+ DML - Data Modelling language

+ CRUD - Create, Read, Update, Delete

+ serializers - Classes that create a formatted representation of objects. For instance, json, html, csv, etc. In our case, the most used format is json, given that the backend interacts with the frontend via REST APIs.

# Code structure
## Backend
The backend consists of applications
There are six applications in our project:
+ Booking
+ pay_process
+ trip
+ userprofile
+ rest-auth
+ allauth

Each application contains the following:
+ Models: This contains class definitions that will perform DDL and DML CRUD operations on database objects.
+ Views: This contains either classic python functions or class-based django rest functions, or django template views.
+ Serializers: Contains classes that provide serialization functionalities to objects. For instance, database objects are serialized to json, transactions from mangopay are serialized to json format as well.
+ urls: Contains mappings between views and url extensions to interact with them.
+ admin: Contains model registrations to be displayed in the django admin portal.

### bin folder
This folder contains the gunicorn script that is run on the remote server to start our application.

## Frontend
- Package.json: This contains a snapshot of all node modules that are installed in the project. This list is used to get modules to install when you run  
`npm install`
- node_modules: This is a folder that contains all the node modules installed in your project.
- staticfiles: This folder is generated after successfull execution of the command  
`python3 manage.py collectstatic`.  
It collect static files in the build repository and makes it available to the application after deployment, given that we do not run any node server on the production server.
- static: contains static files we use in our application. This folder is not automatically generated.
- public: This folder contains the one and only index.html file used by our application. Hence the name SPA.
- media: this folder contains media files, and other files uploaded to our application.
- build: this folder is auto-generated after the  
`npm run build`  
command is successfully run. This folder contains a compressed version of all our react components. This is the folder that is used by the website once it is deployed.
- src folder: This folder contains the following:
    + containers: Contains all custom components created for use in the application. Components that make use of forms have a validation file that provide validation messages and checks for form fields, as well as a css file.
    + intl: Contains files to provide translation for UI components
    + store/actions: Contains actions made on store variables and API calls to the backend.
    + store/reducers: Contains store variables.
    + utils/options: Contains the items listed in select fields, with their translations
    + routes.js: Contains all the url routes that are managed on the frontend.
    + index.js: Contains all the redux stores that the components use. This does a mapping between the files that define the stores and the store names throughout the application.
    + App.js: Application entry file that wraps the entire application with the internationalisation messages. If you remove this wrapper, internationalisation/transaltion is broken.
    + configurations.js: Contains debug Configuration of the app and other helper functions.


# Run locally
There is a guarantee that this project will run in the environment mentionned at the start of this readme, but not in other environments. So, assumptions are made that you have the best environment to run this, which is the one mentionned above.

To run locally, do the following:

+ Create the virtual env folder
`mkdir env`
+ Create a virtual environment  
`python3 -m venv env/`
+ Clone the repo  
`git clone https://tenteeglobal@bitbucket.org/tenteeglobal/inzula.git`
+ Add environment variables to the virtualenvironment's script  
`vi env/bin/activate`  
Environment variables to add are in the DIT document
+ Activate the virtual environment  
`source env/bin/activate`
+ Switch to the proper node version (if you have many node installations)  
If you use nvm(node version manager)  
`nvm use v10.9.0`
+ cd to the project folder  
`cd inzula`
+ Install node dependencies  
`npm install`
+ Install python dependencies  
`pip install -r requirements.txt`
+ Delete the build and staticfiles directories if they exist  
`rm -rf build/`  
`rm -rf staticfiles/`  
+ Check the settings to activate debug in the backend  
`vi inzula/settings.py`  
on line 27, set  
`MANUAL_DEBUG = False`  
to  
`MANUAL_DEBUG = True`
+ Activate debug in the frontend  
`vi src/configurations`  
on line 1, set  
`export const DEBUG = false;`  
to   
`export const DEBUG = true;`
+ Change the backend's database to sqlite  
Make sure lines  
`123 to 128`  
are uncommented, and  
`lines 130 to 139`  
are commented.
+ Make migrations  
`python3 manage.py makemigrations`  
+ Migrations  
`python3 manage.py migrate`  
+ Run the frontend  
`PUBLIC_URL=http://localhost:8000 npm run start`  
+ Run the backend  
`python3 manage.py runserver`
+ Open your browser and go to  
`localhost:3000`
+ Enjoy!


# Build
+ Deactivate debug on the frontend  
`vi src/configurations`  
on line 1, set  
`export const DEBUG = true;`  
to   
`export const DEBUG = false;`
+ Deactivate debug on the backend  
`vi inzula/settings.py`  
on line 27, set  
`MANUAL_DEBUG = True`  
to  
`MANUAL_DEBUG = False`
+ Switch the backend database to postgres settings
Make sure lines  
`123 to 128`  
are commented, and  
`lines 130 to 139`  
are not commented.
+ build the frontend
    - to build for the production server, run  
`PUBLIC_URL=https://dkx1b8wlo613w.cloudfront.net npm run build`
    - to build for the build server, run  
`PUBLIC_URL=https://d1g0ix8w0r103u.cloudfront.net npm run build`
+ Collectstatic files on the backend
Once the build is over, run  
`python3 manage.py collectstatic`
+ Push your code with git  
    - `git add .`  
    - `git commit -am <COMMIT_MSG>`  
    - `git pull origin develop`
+ Notice the newly created build and staticfile directories created
Done!

# Deploy
+ SSH into the server  
For the production server; run   
`ssh -i inzula-infra.pem ubuntu@15.237.97.243`  
For the build server; run   
`ssh -i inzula-infra.pem ubuntu@15.188.61.65`
+ cd to the project directory  
`cd projects/inzula`
+ Activate the virtual environment  
`source ../env/bin/activate`
+ pull the latest changes  
`git pull`
+ restart the gunicorn deamon  
`./bin/gunicorn_start.sh`  
Done!

# To build in test server
+ Check the branch name. You should be in the `test` branch  
  `git branch` helps you do that
+ Make your changes
+ assuming you are in the directory named `inzula`, run  
`./bin/build_in_test_server.sh`
+ Then run this command  
`rm -rf /home/ubuntu/projects/inzula/build/ && rm -rf /home/ubuntu/projects/inzula/staticfiles/ && PUBLIC_URL=https://d1g0ix8w0r103u.cloudfront.net npm run build && python3 /home/ubuntu/projects/inzula/manage.py collectstatic --noinput && ./home/ubuntu/projects/inzula/bin/gunicorn_start.sh`  
This will delete the build files, rebuild the project and launch the server. You will know that it has run successfully when you see a return of the sort  
`[2021-02-07 01:58:22 +0000] [86671] [INFO] Starting gunicorn 19.9.0
[2021-02-07 01:58:22 +0000] [86671] [DEBUG] Arbiter booted
[2021-02-07 01:58:22 +0000] [86671] [INFO] Listening at: unix:/home/ubuntu/projects/env/run/gunicorn.sock (86671)
[2021-02-07 01:58:22 +0000] [86671] [INFO] Using worker: sync
/usr/lib/python3.8/os.py:1023: RuntimeWarning: line buffering (buffering=1) isn't supported in binary mode, the default buffer size will be used
  return io.open(fd, *args, **kwargs)
[2021-02-07 01:58:22 +0000] [86675] [INFO] Booting worker with pid: 86675
[2021-02-07 01:58:22 +0000] [86676] [INFO] Booting worker with pid: 86676
[2021-02-07 01:58:22 +0000] [86677] [INFO] Booting worker with pid: 86677
[2021-02-07 01:58:23 +0000] [86671] [DEBUG] 3 workers`

# Push build from test to prod server
After the build, do
+ `git add .`
+ `git commit -am "<COMMIT_MSG>"`
+ `git push origin test`
+ `git checkout prod`
+ `git pull`
+ `git merge test`
+  Run file  
`./bin/test_to_prod_server.sh`
+ Then push to prod  
`git add .`
+ `git commit -am "<COMMIT_MSG>"`
+ `git push origin prod`
+ Switch back to the `test` branch  
`git checkout test`

# Build in prod server
+ Check the branch name. You should be in the `prod` branch  
  `git branch` helps you do that
+ Make your changes
+ assuming you are in the directory named `inzula`, run  
`./bin/build_in_prod_server.sh`
+ Then run this command  
`rm -rf /home/ubuntu/projects/inzula/build/ && rm -rf /home/ubuntu/projects/inzula/staticfiles/ && PUBLIC_URL=https://dkx1b8wlo613w.cloudfront.net npm run build && python3 /home/ubuntu/projects/inzula/manage.py collectstatic --noinput && ./home/ubuntu/projects/inzula/bin/gunicorn_start.sh`  
This will delete the build files, rebuild the project and launch the server. You will know that it has run successfully when you see a return of the sort  
`[2021-02-07 01:58:22 +0000] [86671] [INFO] Starting gunicorn 19.9.0
[2021-02-07 01:58:22 +0000] [86671] [DEBUG] Arbiter booted
[2021-02-07 01:58:22 +0000] [86671] [INFO] Listening at: unix:/home/ubuntu/projects/env/run/gunicorn.sock (86671)
[2021-02-07 01:58:22 +0000] [86671] [INFO] Using worker: sync
/usr/lib/python3.8/os.py:1023: RuntimeWarning: line buffering (buffering=1) isn't supported in binary mode, the default buffer size will be used
  return io.open(fd, *args, **kwargs)
[2021-02-07 01:58:22 +0000] [86675] [INFO] Booting worker with pid: 86675
[2021-02-07 01:58:22 +0000] [86676] [INFO] Booting worker with pid: 86676
[2021-02-07 01:58:22 +0000] [86677] [INFO] Booting worker with pid: 86677
[2021-02-07 01:58:23 +0000] [86671] [DEBUG] 3 workers`

# Push build from prod to test server
After the build, do
+ `git add .`
+ `git commit -am "<COMMIT_MSG>"`
+ `git push origin prod`
+ `git checkout test`
+ `git pull`
+ `git merge prod`
+  Run file  
`./bin/prod_to_test_server.sh`
+ Then push to prod  
`git add .`
+ `git commit -am "<COMMIT_MSG>"`
+ `git push origin test`
+ Switch back to the `prod` branch  
`git checkout prod`
