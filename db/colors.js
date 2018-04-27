var mongo = require('./mongo');

module.exports = {
  getAllColors: function (callback) {
    mongo.Colors.find(function (error, colors) {
      callback(error, colors);
    });
  },

  addColors: function (colorData, callback) {
    var canvas = new mongo.Colors(colorData);
    canvas.save(function (error) {
      callback(error);
    });
  }
};
