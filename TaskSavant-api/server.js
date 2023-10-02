const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const tasks = [
  { id: 0, name: 'Task 1', assignedTo: 'John Doe', dueDate: '2023-10-10', completed: false, description: "Block of information about the task!!!" },
  { id: 1, name: 'Task 2', assignedTo: 'Jane Deer', dueDate: '2023-10-15', completed: true, description: "Block of information about the task!!!" },  
  { id: 2, name: 'Show Amy Code', assignedTo: 'Cixtian Trybe', dueDate: '2023-10-15', completed: true, description: "Block of information about the task!!!" },  
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
