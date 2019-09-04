## ProfessOrNot

A better rate my professor that uses personality tests and heuristics to recommend classes based on your learning styles and preferences.

### Mission

Different students learn in different ways, and what one student likes in a professor may not apply to everyone. We think this could be improved. Using a personality test and learning style survey, we can create an algorithm to weight scores based on the submitters learning style similarity to the requestor, and provide a personalized recommendation.

### Key Technologies

#### Databases

**Druid** an online analytical processing database that stores peer reviews and aggregates scores based on user specific dimensions. You could call it the "numbers" database.

**MySQL** the trasactional database that stores user information, professor information, course information, and reviews. This database is for querying individual records. When a new review is created, all necessary information is extracted from this database, flattened (transformed), and ingested (loaded) into Druid. This is called the ETL process and it is handled by the Java EE API.

#### Web Tools

**React.JS** is a javascript library for building the front end for web applications. 

**Spring Boot** is a MVC framework for Java EE applications and will connect to data sources and will be used to create the API.

