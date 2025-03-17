// Importar dependencias
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializar Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Variables y constantes
const tasks = [];
const MAX_TASKS = 5; // Constante

// Rutas de la API

// Ruta de inicio
app.get('/', (req, res) => {
    if (tasks.length === 0) {
        return res.json({ message: 'No hay tareas.', tasks: [] });
      }
      
      const formattedTasks = tasks.map((task, index) => {
        return { id: index, name: task };
      });
      
      return res.json({ tasks: formattedTasks })
});

// MÓDULO 1: Agregar una tarea
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  
  if (!task) {
    return res.status(400).json({ error: 'El nombre de la tarea es requerido' });
  }
  
  if (tasks.length >= MAX_TASKS) {
    return res.status(400).json({ error: 'No puedes agregar más tareas. Límite alcanzado.' });
  }
  
  tasks.push(task);
  return res.status(201).json({ message: `Tarea "${task}" agregada.`, tasks });
});

// MÓDULO 2: Listar todas las tareas
app.get('/tasks', (req, res) => {
  if (tasks.length === 0) {
    return res.json({ message: 'No hay tareas.', tasks: [] });
  }
  
  const formattedTasks = tasks.map((task, index) => {
    return { id: index, name: task };
  });
  
  return res.json({ tasks: formattedTasks });
});

// MÓDULO 3: Eliminar una tarea por su índice
app.delete('/tasks/:id', (req, res) => {
  const index = parseInt(req.params.id);
  
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    return res.status(400).json({ error: 'Índice inválido.' });
  }
  
  const removed = tasks.splice(index, 1);
  return res.json({ message: `Tarea "${removed}" eliminada.`, tasks });
});

// MÓDULO 4: Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const index = parseInt(req.params.id);
  const { task } = req.body;
  
  if (!task) {
    return res.status(400).json({ error: 'El nombre de la tarea es requerido' });
  }
  
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    return res.status(400).json({ error: 'Índice inválido.' });
  }
  
  tasks[index] = task;
  return res.json({ message: `Tarea actualizada a "${task}"`, tasks });
});

// Puerto para la API
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Para exportar las funciones (opcional)
module.exports = app;