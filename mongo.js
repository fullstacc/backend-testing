const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://root-usr:${password}>@cluster0.qkn9j.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personeSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log('note saved!');
  mongoose.connection.close();
});
