const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
  title: String,
  main: Boolean,
  timeStart: Date,
  timeEnd: Date,
  status: String
}));

Task.create = function (newTask, callback) {
  newTask.save(callback);
};

module.exports = Task;



