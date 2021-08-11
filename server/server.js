const dbConfig = require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/task');
const app = express();
const port = 3010;

app.use(bodyParser.json({type: 'application/json'}));

mongoose.connect(dbConfig.uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
  console.error('connection error:');
});

mongoose.connection.once('open', function () {

  // GET
  app.get('/api/tasks', (req, res) => {
    const fromDate = new Date(req.query.from);
    const toDate = new Date(req.query.to);
    const queryParams = {
      timeStart: {$gte: fromDate},
      timeEnd: {$lte: toDate}
    };
    if (req.query.main) {
      queryParams.main = req.query.main === 'true';
    }
    toDate.setHours(23, 59, 59, 999);
    Task.find(queryParams).then(tasks => {
      res.json(tasks);
    });
  });

  // CREATE
  app.post('/api/tasks', (req, res) => {
    const newTask = new Task({
      title: req.body.title,
      main: req.body.main,
      timeStart: new Date(req.body.timeStart),
      timeEnd: new Date(req.body.timeEnd),
      status: req.body.status
    });
    Task.create(newTask, function (err, task) {
      if (err) {
        res.status(503);
        res.end();
        return;
      }
      res.json(task);
    });
  });

  // EDIT
  app.put('/api/tasks/:id', (req, res) => {
    const task = req.body;
    Task.findOne({_id: req.params.id}, function (err, task) {
      if (err) {
        res.status(503);
        res.end();
        return;
      }
      task.title = req.body.title;
      task.timeStart = req.body.timeStart
      task.timeEnd = req.body.timeEnd;
      task.save(function (err) {
        if (err) {
          console.log("Error: could not save contact " + contact.phone);
        } else {
          res.json(task);
        }
      });
    });
  });

  //DELETE
  app.delete('/api/tasks/:id', (req, res) => {
    const task = req.body;
    Task.deleteOne({_id: req.params.id}, function (err) {
      if (err) {
        console.log('error');
        res.status(503);
        res.end();
        return;
      }
      console.log('ok');
      res.end();
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});
