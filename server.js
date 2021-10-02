require('dotenv').config({path: "./config.env"});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
// useUnifiedTopology: true,
mongoose.connect(process.env.MONGO_CONNECT, {
    
}).then(() => console.log("Connected to DB"))
.catch(console.error);



app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos/new', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

app.delete('/todos/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);

});





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

