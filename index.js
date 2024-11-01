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
    const bulkOperations = tasks.map(task => ({
      updateOne: {
        filter: { _id: task._id },
        update: { order: task.order },
      },
    }))
    try {
      await Task.bulkWrite(bulkOperations)
      res.status(200).send("Order updated successfully")
    } catch (error) {
      res.status(500).send("Error updating order")
    }
  })
  
app.listen(5000, () => console.log('Server conectado na porta 5000'))
