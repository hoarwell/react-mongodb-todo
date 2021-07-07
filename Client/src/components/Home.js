import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';

const Home = () => {
    const [ index, setIndex ] = useState("");
    const [ content, setContent ] = useState("");
    const [ editing, setEditing ] = useState(false);
    const [ todo, setTodo ] = useState("");

    const inputRef = useRef();

    const handleChange = (e) => {
        const { value } = e.target;
        setContent(value);
    }

    const handleSubmit = (e) => {
        const { dataset } = e.target;
        const id = dataset.index;
        e.preventDefault();
        if (!editing) {
            const obj = {
                id: Math.random().toString(36).substr(2, 9),
                date: Date.now(),
                content: content,
            }
            axios.post("http://localhost:3001/create", obj)
                .then((res) => {
                    console.log('Data Added')
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            const editObj = {
                id: todo[index].id,
                date: Date.now(),
                content: content,
            }
            axios.post(`http://localhost:3001/update/${id}`, editObj)
                .then((res) => {
                    console.log('Data Updated')
                }).catch((error) => {
                    console.log(error);
                })
        }
        inputRef.current.value = "";
        setEditing(false);
    }

    const handleEdit = (e) => {
        const { dataset } = e.target;
        setEditing(!editing);
        const index = todo.findIndex((data => data.id === dataset.index));
        setIndex(index);
    }

    const handleDelete = (e) => {
        const { dataset } = e.target;
        const id = dataset.index;
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then((res) => {
                console.log('Data Deleted')
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        axios.get('http://localhost:3001/todos')
            .then((res) => {
                const data = res.data;
                setTodo(data);
            })
    })

    return(
        <div className = "container">
            <h1>ToDo</h1>
            <form className = "todo-form" onSubmit = { handleSubmit }>
                <input type = "text" onChange = { handleChange } ref = { inputRef } placeholder = "content" required />
                <input type = "submit" />
            </form>
            {
                todo ? <TodoList todo = { todo }
                                index = { index }
                                editing = { editing }
                                handleChange = { handleChange }
                                handleDelete = { handleDelete } 
                                handleEdit = { handleEdit } 
                                handleSubmit = { handleSubmit } /> 
                    : "There's no list yet!"
            }
        </div>
    );
}

export default Home;