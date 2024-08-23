import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState(""); 

    //When user clicks add, I send a fetch request to the server
    //Its of type POST, the body contains the user's input (description) 
    //and its hitting the "./todos" route in localhost
    //Then, the server does work in the backend to add the description to db
    const onSubmitForm = async e => {
        e.preventDefault();//To ensure the page doesnt refresh
        try{
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";//To refresh the window and clear out the form
        }catch (err){
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;