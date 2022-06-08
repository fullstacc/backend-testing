const mongoose = require('mongoose');
const password = process.argv[2];
const url2 = `mongodb+srv://new-usr:${password}@cluster0.qkn9j.mongodb.net/noteApp?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}



// schema -> model
const Person = mongoose.model('Person', personSchema);
console.log('process arg length', process.argv.length);
// if there are only 3 parameters, retrieve list of all persons in phonebook
if (process.argv.length === 3) {
  mongoose
    .connect(url2)
    .then((result) => {
      console.log('connected'),
        // return note.save();
        // list all persons in the mongodb database
        Person.find({}).then((result) => {
          console.log('phonebook:');
          result.forEach((note) => console.log(`${note.name} ${note.number}`));
          mongoose.connection.close();
        });
    })
    .catch((err) => {
      console.log(err);
    });
} else if (process.argv.length === 5) {
  // instantiate an object

  mongoose
    .connect(url2)
    .then((result) => {
      console.log('connected!');
      const newPerson = new Person({
        id: 1,
        name: process.argv[3],
        number: process.argv[4],
      });
      return newPerson.save();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((e) => console.log(e));
}
