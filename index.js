const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const Task = require('./models/Task')
const connectDatabase = require('./dataBase/db')

const app = express()

connectDatabase()
app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find().sort('order')
    res.json(tasks)
  })
  
  app.post('/tasks', async (req, res) => {
    try {
      const { name, cost, deadline } = req.body
      const nameLower = name.toLowerCase()
  
      const existingTask = await Task.findOne({ searchName: nameLower })
  
      if (existingTask) {
        return res.status(400).json({ error: `O item "${name}" já está cadastrado na lista.` })
      }
  
      const order = (await Task.countDocuments()) + 1
      const task = new Task({
        name,
        searchName: nameLower,
        cost,
        deadline,
        order,
      })
  
      await task.save()
      res.status(201).json(task)
    } catch (error) {
      if (error.code === 11000) {
        const duplicateKey = error.keyValue.name
        return res.status(400).json({ error: `O item "${duplicateKey}" já está cadastrado na lista.` })
      }
  
      res.status(400).json({ error: error.message })
    }
  })
  
  app.put('/tasks/:id', async (req, res) => {
    const nameLower = req.body.name.toLowerCase()
  
    const existingTask = await Task.findOne({
      name: nameLower,
      _id: { $ne: req.params.id },
    })
  
    if (existingTask) {
      return res.status(400).json({ error: 'Task name already exists' })
    }
  
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { ...req.body, name: req.body.name }, { new: true })
    res.json(updatedTask)
  })
  
  app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).send()
  })

  app.patch('/tasks/reorder', async (req, res) => {
    const { tasks } = req.body
    try {
      for (let i = 0; i < tasks.length; i++) {
        await Task.findByIdAndUpdate(tasks[i]._id, { order: i })
      }
      res.status(200).json({ message: 'Ordem atualizada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar a ordem', error })
    }
  })
  
app.listen(5000, () => console.log('Server conectado na porta 5000'))
