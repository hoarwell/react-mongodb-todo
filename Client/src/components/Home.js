import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';
import dotenv from "dotenv";

const Home = () => {
    const [ index, setIndex ] = useState("");
    const [ content, setContent ] = useState("");
    const [ editing, setEditing ] = useState(false);
    const [ todo, setTodo ] = useState("");
    const [ coord, setCoord ] = useState("");

    const inputRef = useRef();

    dotenv.config();
    const key = process.env.REACT_APP_API_KEY;

    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setCoord({
            latitude: latitude,
            longitude: longitude
        })
    });
    
    const getData = () => {
        axios.get('http://localhost:3001/todos')
        .then((res) => {
            const data = res.data;
            setTodo([...data]);
        })
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setContent(value);
    }

    const handleSubmit = async (e) => {
        const { dataset } = e.target;
        const id = dataset.index;
        e.preventDefault();

        let weatherData;
        await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${coord.latitude}&lon=${coord.longitude}&key=${key}`)
            .then((res) => {
                weatherData = res.data.data;
            }).catch((error) => {
                console.log(error);
            })
        
        if (!editing) {
            const obj = {
                id: Math.random().toString(36).substr(2, 9),
                date: Date.now(),
                content: content,
                coord: coord,
                weather: {
                    aqi: weatherData.current.pollution.aqius,
                    temp: weatherData.current.weather.tp,
                    weather: weatherData.current.weather.ic,
                }
                
            }
            axios.post("http://localhost:3001/create", obj)
                .then((res) => {
                    console.log('Data Added');
                    getData();
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            const editObj = {
                id: todo[index].id,
                date: Date.now(),
                content: content,
                coord: coord,
                weather: {
                    aqi: weatherData.current.pollution.aqius,
                    temp: weatherData.current.weather.tp,
                    weather: weatherData.current.weather.ic,
                }
            } // 배열 준비 
            axios.post(`http://localhost:3001/update/${id}`, editObj)
                .then((res) => {
                    console.log('Data Updated');
                    getData();
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
                console.log('Data Deleted');
                getData();
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return(
        <div className = "container">
            <h1>ToDo</h1>
            <form className = "todo-form" onSubmit = { handleSubmit }>
                <input type = "text" onChange = { handleChange } ref = { inputRef } placeholder = "content" required />
                <input type = "submit" />
            </form>
            {
                todo.length > 0 ? <TodoList todo = { todo }
                                getData = { getData }
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