const express = require('express');
const app = express();

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
  //   console.log('made it here', id);
  //   persons = persons.filter((person) => person.id !== id);
  //   let person = persons.find((person) => person.id === id);

  //   if (person) {
  //     response.status(204).end();
  //   } else {
  //     response.status(404).send({ foo: 'bar' }).end();
  //   }

  //   response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
