# Environment & Tech
- Python 3.6.9
- Nodejs v10.9.0

# Terminology
+ Django – The backend framework used

+ React – The frontend framework used

+ DjangoRestFramework - The module that provides interfaces to create REST APIs

+ MySQL, PostgreSQL, SQLite

+ SQL – when referring to SQL

+ Python – the programming language used for backend

+ JavaScript – the programming language used for frontend

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
`python3 manage.py collectstatic` on Linux or `python manage.py collectstatic` on Windows.  
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
    + routes.js and dashboardRoutes.js: Contain all the url routes that are managed on the frontend.
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
`vi env/bin/activate` on Linux or edit `env\Scripts\activate.bat` on Windows  
Environment variables to add are in the DIT document
+ Activate the virtual environment  
`source env/bin/activate` on Linux or `env\Scripts\activate` on Windows
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
+ Install postgreSQL if not already installed and create a database named
`inzuladb`
With a user named `inzula` and password `inzula`
Django will connect to that database
+ Make migrations  
`python3 manage.py makemigrations` on Linux or  `python manage.py makemigrations` on Windows
+ Migrations  
`python3 manage.py migrate` on Linux or  `python manage.py migrate` on Windows
+ Run the frontend  
`PUBLIC_URL=http://localhost:8000 npm run start` on Linux or  `npm run start` on Windows
+ Run the backend  
`python3 manage.py runserver` on Linux or  `python manage.py runserver` on Windows
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
+ build the frontend
    - to build for the production server, run  
`PUBLIC_URL=https://dkx1b8wlo613w.cloudfront.net npm run build` on Linux
`set PUBLIC_URL=https://dkx1b8wlo613w.cloudfront.net&&npm run build` on Windows
    - to build for the build server, run  
`PUBLIC_URL=http://15.188.32.228 npm run build` on Linux
`set PUBLIC_URL=http://15.188.32.228&&npm run build` on Windows
+ Collectstatic files on the backend
Once the build is over, run  
`python3 manage.py collectstatic` on Linux or `python manage.py collectstatic` on Windows
+ Push your code with git  
    - `git add .`  
    - `git commit -am <COMMIT_MSG>`  
    - `git push origin frontEndMigration`
+ Notice the newly created build and staticfile directories created
Done!

# Deploy
+ SSH into the server  
For the production server; run   
`ssh -i inzula-infra.pem ubuntu@15.188.61.65`  
For the build server; run   
`ssh -i inzula-infra.pem ubuntu@15.188.32.228`
You can also use Putty or MobaXTerm
+ cd to the project directory  
`cd projects/inzula`
+ Activate the virtual environment  
`source ../env/bin/activate`
+ pull the latest changes  
`git pull origin <Branch name>`
+ restart the gunicorn deamon  
`./bin/gunicorn_start.sh`  
Done!
