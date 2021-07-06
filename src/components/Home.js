import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import TodoList from 'components/TodoList';

const Home = () => {
    const [ content, setContent ] = useState("");
    const [ editing, setEditing ] = useState(false);
    const [ todo, setTodo ] = useState("");
        // 기존의 todo state는 db에서 가져온 결과를
        // 담아야 하고 todo state를 이용했던 것 들은 
        // 일단 db에서 가져온 데이터를 바탕으로 수정해준다.
    const [ index, setIndex ] = useState("");
    const inputRef = useRef();

    const handleChange = (e) => {
        const { value } = e.target;
        setContent(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editing) {
            const obj = {
                id: Math.random().toString(36).substr(2, 9),
                date: Date.now(),
                content: content,
            }
            setTodo([...todo, obj]);
            axios.post("http://localhost:3001/create", obj);
        } else {
            const editObj = {
                id: todo[index].id, // 
                date: Date.now(),
                content: content,
            }
            let editedTodo = todo; // 
            editedTodo[index] = editObj; // 
            setTodo(editedTodo); //
        }
        inputRef.current.value = "";
        setEditing(false);
    }

    const handleEdit = (e) => {
        const { dataset } = e.target;
        setEditing(!editing);
        let index = todo.findIndex((data => data.id === dataset.index)); // 
        setIndex(index);
        console.log(index);
    }

    const handleDelete = (e) => {
        const { dataset } = e.target;
        const newList = todo.filter((data) => data.id !== dataset.index); // 
        console.log(newList);
        setTodo(newList); // 
    }

    // useEffect(() => {
    //     fetch("/todo").then((res) => {
    //         if(res.ok){
    //             return res.json()
    //         }
    //     }).then((jsonRes) => {
    //         setTodo()
    //     })
    // })

    return(
        <div className = "container">
            <h1>ToDo</h1>
            <form className = "todo-form" onSubmit = { handleSubmit }>
                <input type = "text" onChange = { handleChange } ref = { inputRef } placeholder = "content" required />
                <input type = "submit" />
            </form>
            {
                todo ? <TodoList todo = { todo }
                                handleChange = { handleChange }
                                handleDelete = { handleDelete }
                                handleEdit = { handleEdit } 
                                handleSubmit = { handleSubmit } 
                                index = { index } 
                                editing = { editing } /> 
                    : "No list for today!"
            }
        </div>
    );
}

export default Home;