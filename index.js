const express = require('express');
const app = express();

const PORT = 3001;

const persons = [
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

// `<div>Phonebook has info for {responseObject.numberOfPeople} people</div>`
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
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
