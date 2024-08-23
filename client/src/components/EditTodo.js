import React, { Fragment, useState } from "react";

const EditTodo = (props) => {

    const [description, setDescription] = useState(props.todo.description);

    //function to edit the description of the todo
    const updateDescription = async(e) => {
        e.preventDefault();
        try{
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${props.todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        }catch (err){
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${props.todo.todo_id}`}>
                Edit
            </button>

            {/* When the Edit button is clicked, the popscreen that opens is rendered by this: */}
            <div className="modal" id={`id${props.todo.todo_id}`} onClick={() => setDescription(props.todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* This is the header of the pop-up screen */}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(props.todo.description)}                                    
                            >
                            </button>
                        </div>

                        {/* This is the body of the pop-up screen (contains input area)*/}
                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                            />
                        </div>

                        {/* This is the footer of the pop-up screen (edit and close buttons)*/}
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-bs-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >
                                Edit
                            </button>

                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(props.todo.description)}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;