const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// server database metadata
app.get('/info', (request, response) => {
  let responseObject = {
    numberOfPeople: persons.length,
    date: new Date(),
  };
  response.status(200).send(
    `<h1>Phonebook</h1> <div>Phonebook has info for ${responseObject.numberOfPeople} people</div>
      <div>${responseObject.date}</div>`
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  let person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  response.send('Got a DELETE request at /id');
  console.log('total url is', id);
  console.log('req path is', request.path);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

/* - Generate a new id for the phonebook entry with the Math.random function. 
Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.
*/
app.post('/api/persons', (request, response) => {
  // generate random id
  // this section courtesy of tutorial @ learnersbucket
  // TODO: Refactor into a more concise way to generate random user ID's
  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    //return id of format 'aaaaaaaa'-'aaaa'
    return s4() + s4() + '-' + s4();
  };
  console.log('these are the request headers', request.headers);
  const body = request.body;
  console.log('this is the request body', body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'missing fields',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: guid(),
  };

  persons = persons.concat(person);

  response.json(person);

  // const person = request.body;
  // person.id = guid();

  // persons = persons.concat(person);

  // response.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
