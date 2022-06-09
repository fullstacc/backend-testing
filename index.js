const express = require('express');
const morgan = require('morgan');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('build'));

const Person = require('./models/person');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>');
});

// retrieve all persons objects from database
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    console.log('made it here');
    response.json(persons);
  });
});

// post object to database
app.post('/api/persons', (req, res) => {
  console.log('made it here');
  const body = req.body;
  // create a person instance from the request body sent from the front end
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  // save to mongodb
  newPerson.save().then((result) => {
    console.log('person added to phonebook');
  });

  console.log('this is request body', body);
});

// server database metadata
// app.get('/info', morgan('tiny'), (request, response) => {
//   let responseObject = {
//     numberOfPeople: persons.length,
//     date: new Date(),
//   };
//   response.status(200).send(
//     `<h1>Phonebook</h1> <div>Phonebook has info for ${responseObject.numberOfPeople} people</div>
//       <div>${responseObject.date}</div>`
//   );
// });

// find by id operation [old]
// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   let person = persons.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// delete operation [old]
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   response.send('Got a DELETE request at /id');
//   console.log('total url is', id);
//   console.log('req path is', request.path);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// add operation [old]
// app.post(
//   '/api/persons',
//   morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'),
//       '-',
//       tokens['response-time'](req, res),
//       'ms',
//       tokens.res.body(req, res),
//     ].join(' ');
//   }),
//   (request, response) => {
//     // generate random id
//     // this section courtesy of tutorial @ learnersbucket
//     // TODO: Refactor into a more concise way to generate random user ID's
//     let guid = () => {
//       let s4 = () => {
//         return Math.floor((1 + Math.random()) * 0x10000)
//           .toString(16)
//           .substring(1);
//       };
//       //return id of format 'aaaaaaaa'-'aaaa'
//       return s4() + s4() + '-' + s4();
//     };
//     console.log('these are the request headers', request.headers);
//     const body = request.body;
//     console.log('this is the request body', body);

//     if (!body.name || !body.number) {
//       return response.status(400).json({
//         error: 'missing fields',
//       });
//     }

// const person = {
//   name: body.name,
//   number: body.number,
//   date: new Date(),
//   id: guid(),
// };

//     if (persons.find((x) => x.name === person.name)) {
//       return response.status(400).json({
//         error: 'name already exists in database',
//       });
//     }
//     persons = persons.concat(person);

//     response.json(person);
//   }
// );

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
