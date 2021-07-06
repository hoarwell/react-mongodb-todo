import React from 'react';

const TodoList = ({ todo, handleEdit, handleDelete, handleChange, handleSubmit, index, editing }) => {
    
    return (
        <div>
            {
                todo.map((data, i) => (
                    <>
                        <div className = "todo-container">
                            <h3>{ data.content }</h3>
                            {
                                (editing && (i === index)) && <input type = "text" data-index = { data.id } onChange = { handleChange } />
                            }
                            <p>added on { data.date }</p>
                            {
                                (editing && (i === index)) && <button onClick = { handleSubmit } data-index = { data.id }>Submit</button>
                            }
                            <button onClick = { handleEdit } data-index = { data.id } >{ (editing && (i === index)) ? "Cancel" : "Edit" }</button>
                            <button onClick = { handleDelete } data-index = { data.id } >Delete</button>
                        </div>
                    </>
                ))
            }
        </div>
    );
}

export default TodoList;