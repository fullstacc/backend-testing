const express = require('express');
const morgan = require('morgan');
const app = express();

const bodyParser = require('body-parser');
app.use(express.static('build'));
app.use(bodyParser.json());

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
app.post('/api/persons', (req, res, next) => {
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
  })
  .catch((e) => next(e));

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

// find by id operation
// next function passes error to middleware
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

// delete operation [new]
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((res) => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

// put operation [find by id and update it]
app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body
  console.log('this is the req body', req.body)
  console.log('this is the req id', req.params.id)

  const newPerson = {
    name: name,
    number: number
  }


  // If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, 
  // the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL. 
  // Modify the backend to support this request.

  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true, content: 'query' })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((e) => next(e));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'misformatted id' });
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  next(error);
};
}

app.use(errorHandler);
