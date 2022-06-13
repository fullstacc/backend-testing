# backend-testing

a repo for testing out Node, Express, and MongoDB integration

[x] 3.1 - Setting up Express Routes

- _Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons._

[x] 3.2 - Server metadata

- _Implement a page at the address http://localhost:3001/info that shows the time that the request was received and how many entries are in the phonebook at the time of processing the request._

[x] 3.3 - Display single entries (in a RESTful way)

- _Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5_
- _If an entry for the given id is not found, the server has to respond with the appropriate status code._

[x] 3.4 - Delete entries (in a RESTful way)

- Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
- Test that your functionality works with either Postman or the Visual Studio Code REST client.

[x] 3.5 - Add new entries (in a RESTful way)

- Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
- Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

[x] 3.6 - Error Handling

- Implement error handling for creating new entries. The request is not allowed to succeed if:
  - The name or number is missing
  - The name already exists in the phonebook
- Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error

[x] 3.7 - Logging

- Add the morgan middleware to your application for logging.
  - Configure it to log messages to your console based on the tiny configuration.

[x] 3.8 - Advanced Logging

- Configure morgan so that it also shows the data sent in HTTP POST requests

[x] 3.9 - Phonebook Front End + Back End

- Make the backend work with the phonebook frontend from the exercises of the previous part.

[x] 3.10 - Deploy to the Internet

- Deploy the backend to the internet, for example to Heroku.
- Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

[x] 3.11 - Production Build

- Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.
- Also make sure that the frontend still works locally (in development mode when started with command `npm start`).

[x] 3.12 - Command-Line Database

- Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.
- Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.
- The application should work as follows. You use the program by passing three command-line arguments (the first is the password, the second is the name, and the third is the phone number)
- if the name contains whitespace characters, it must be enclosed in quotes
- If the password is the only parameter given to the program, Then the program should display all of the entries in the phonebook

[x] 3.13 - Phonebook database, step1

- Change the fetching of all phonebook entries so that the data is fetched from the database.
- Verify that the frontend works after the changes have been made.
- write all Mongoose-specific code into its own module

[x] 3.14 - Phonebook database, step2

- Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.
  At this point, you can choose to simply allow users to create all phonebook entries.
- The phonebook can have multiple entries for a person with the same name.

[x] 3.15 - Phonebook database, step3 (delete from db)

- Change the backend so that deleting phonebook entries is reflected in the database.

[x] 3.16 - Phonebook database, step4 (error handler middlware)

- Move the error handling of the application to a new error handler middleware.

[ ] 3.17 - Phonebook database, step5 (updating contact info)

- If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL. Modify the backend to support this request.

[ ] 3.18 - Phonebook database, step6 ( `/api/persons/:id` and `info` routes)

- update handling `/api/persons/:id` and `info` routes to use the database


[ ] 3.19 - Phonebook database ,step7 (error handling and validation)
- Expand the validation so that the name stored in the database has to be at least three characters long.
- Expand the frontend so that it displays some form of error message when a validation error occurs.

---
