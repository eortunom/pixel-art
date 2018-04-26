

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pixelart', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});

var db = mongoose.connection;

var colorsSchema = new mongoose.Schema({
  array: [String] 
});

var Colors = mongoose.model('Colors', colorsSchema);

module.exports = {
  Colors: Colors
};
