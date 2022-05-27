# backend-testing

a repo for testing out Node, Express, and MongoDB integration

[x] 3.1 - Setting up Express Routes

- _Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons._

[x] 3.2 - Server metadata

- _Implement a page at the address http://localhost:3001/info that shows the time that the request was received and how many entries are in the phonebook at the time of processing the request._

[x] 3.3 - Display single entries (in a RESTful way)

- _Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5_
- _If an entry for the given id is not found, the server has to respond with the appropriate status code._

[ ] 3.4 - Delete entries (in a RESTful way)

- Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
- Test that your functionality works with either Postman or the Visual Studio Code REST client.

[ ] 3.5 - Add new entries (in a RESTful way)

- Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
- Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

[ ] 3.6 - Error Handling

- Implement error handling for creating new entries. The request is not allowed to succeed if:
  - The name or number is missing
  - The name already exists in the phonebook
- Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:
