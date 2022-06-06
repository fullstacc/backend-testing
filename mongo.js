// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log(
//     'Please provide the password as an argument: node mongo.js <password>'
//   );
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://root-usr:${password}>@cluster0.qkn9j.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   number: Number,
// });

// const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//   id: 'TML is Easy',
//   date: new Date(),
//   important: true,
// });

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url2 = `mongodb+srv://new-usr:${password}@cluster0.qkn9j.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Note = mongoose.model('Note', noteSchema);
const Person = mongoose.model('Person', personSchema);

// if there are only 3 parameters, retrieve list of all persons in phonebook
if (process.argv.length === 3) {
  mongoose
    .connect(url2)
    .then((result) => {
      console.log('connected');

      // const note = new Note({
      //   content: 'HTML is Easy',
      //   date: new Date(),
      //   important: true,
      // });

      // return note.save();
      // list all persons in the mongodb database
      Person.find({}).then((result) => {
        result.forEach((note) => console.log(note));
      });
    })
    .catch((err) => console.log(err));
}
