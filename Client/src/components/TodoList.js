import React, { useEffect } from 'react';

const TodoList = ({ todo, getData, handleEdit, handleDelete, handleChange, handleSubmit, index, editing }) => {
    useEffect(() => {
        getData();
    }, [])

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
                            <p>air quality { data.weather.aqi }</p>
                            <p>weather status</p>
                            <img src = {`https://airvisual.com/images/${data.weather.weather}.png`} alt = ""/>
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