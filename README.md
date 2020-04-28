## ProfessOrNot
[![Build Status](https://travis-ci.com/SCCapstone/ProfessOrNot.svg?token=pYg6WhKK8Np7sPZkTLzW&branch=develop)](https://travis-ci.com/SCCapstone/ProfessOrNot)

A better rate my professor that uses personality tests and heuristics to recommend classes based on your learning styles and preferences. Its latest deployed version can be accessed at https://dev.professornot.com/ The 1.0 can be found at https://www.professornot.com

### Mission

Different students learn in different ways, and what one student likes in a professor may not apply to everyone. We think this could be improved. Using a personality test and learning style survey, we can create an algorithm to weight scores based on the submitters learning style similarity to the requestor, and provide a personalized recommendation.

### Key Technologies

Frontend: VueJS, Vuex, Axios.\
VueJS is our Javascript framework, similar to React and Angular, it provides the concept of reusable compontents for us to build our application with.\
Redux is our state management system. This is similar to 'global variables' in that it is a globally accessible data store from inside all components in the application.\
Axios handles our Rest API calls to the backend.

Backend: Django, Django Rest Framework, PostgreSQLs.\
Django Rest Framework is the backend framework we chose to develop our RESTful API. We are using PostgreSQL as our database which is accessed through Django's built in Object Relational Model (ORM) system. You can find our interactive API docs on [SwaggerHub](https://app.swaggerhub.com/apis-docs/professornot/Django/1.0.0#/Reviews/post_reviews).

Systems Engineering\
Our website is running on four DigitalOcean droplets in two isolated enviroments, DEV and PROD. The dev branch is automatically updated by GitHub commits to the develop branch through TravisCI. The frontend is served statically by Ngnix, and the backend is served through Nginx (Web Server) -> Gunicorn (Application Server) -> Django (.py files).

### Repository

#### Branches

:lock:`develop` default branch, all approved work merges here [at lease one review required]

:lock:`release` once a release is ready, a PR is made to this branch and everyone needs to approve [everyone must review]

`IS##-Issue_name` create a branch for each issue you are working on so we can keep track of everything

#### Pull Requests

When making a pull request you need to add someone as a reviewer. If your code changes something someone else wrote please add **them** as a reviewer so they can see what has changed. 

When reviewing a PR, check that the person isn't going to break your code or someone elses. If you see something that changes someone elses code, add them as a reviewer and let them know.

*The goal of PRs is to keep someone else from breaking your code by accident!*

### Testing

#### Unit Testing

* Django
  * Unit testing is performed with the built in Django testing framework
  * The tests are located in the tests.py file inside of each Django "application" eg. api/schools/tests.py
  * To run the unit tests, pipenv is required to create a virtual python enviroment to install dependencies
    * 1. Install Pipenv
      2. In the api folder type `pipenv shell`
      3. In the virtual env shell, type `./manage.py test`
* Vue
  * Jest
   * Unit testing is dne with Vue.js's jest testing platform.
   * Tests are located in the file.test.js file within the test folder in the frontend
   * To run the test, assuming npm is installed. Use "npm run test"

#### Behavioral Testing

* Frontend(Vue)
  * Selenium
   * Behavioral testing is done with Selenium.
   * Tests are located in .side files within the test folder.
   * To run the behavioral tests
    * 1. Install selenium. I used npm. "npm i selenium-webdriver"
      2. Install the correct webdriver for your browser. I use the chrome webdriver. Can be downloaded here: https://www.npmjs.com/package/selenium-webdriver
      3. Install selenium-side-runner. "npm i selenium-side-runner"
      4. Run the test. "selenium-side-runner testfile.side" 
   

