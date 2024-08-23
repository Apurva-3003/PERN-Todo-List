import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = 5000;

//middleware:
//app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
    try {
        //When user writes into UI and submits, 
        //the data is passed here in req.body
        //Then I insert the provided description 
        //into the todo table using SQL query
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});


//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description=$1 WHERE todo_id=$2", 
            [description, id]
        );

        // Check if the update was successful (affected rows > 0)
        if (updateTodo.rowCount > 0) {
            res.status(200).json({ message: "Todo updated successfully" });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    } catch (err) {
        console.log(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id=$1"
            , [id]
        );
        // Check if the deletion was successful (affected rows > 0)
        if (deleteTodo.rowCount > 0) {
            res.status(200).json({ message: "Todo deleted successfully" });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    }catch (err){
        console.log(err.message);
    }
});

//Detecting if server is running correctly
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
