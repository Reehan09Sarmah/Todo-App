const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Todo = require('./models/todoSchema')
const methodOverride = require('method-override')


mongoose.connect('mongodb://localhost:27017/TodoTasks', { useNewUrlParser: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");

    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('./public'))


//Routes

app.get('/todo', async (req, res) => {
    const tasks = await Todo.find({})
    res.render('todo', { tasks })
})

app.post('/todo', async (req, res) => {
    const newTask = new Todo(req.body)
    await newTask.save()
    res.redirect('/todo')
})

//to delete item when we click on it
app.get('/todo/:id', async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)
    const tasks = await Todo.find({})
    res.render('todo', { tasks })
})







app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})
