//This file conrains the client side for Listing and Deleting todo items
import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    //todos is an array of all the items in the todo table
    const [todos, setTodos] = useState([]);

    //delete todo function:
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch("http://localhost:5000/todos/" + id, {
                method: "DELETE",
            });
            setTodos(prevTodos => prevTodos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //This function sends a GET request to "./todos" endpoint and fetches all the items in todo table
    //Then, it parses the json data and updates the value of todos with it
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    //useEffect will make a fetch request to the server, everytime this component is rendered
    //we need this because getTodos is not rendered by the user clicking a button, it is shown on the screen by default
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loop through all the elements in todo table and display them in a list */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;