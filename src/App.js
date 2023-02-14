import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import Todo from './ViewTodo.js'
import FormTodo from './FormTodo.js'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'


function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setcurrentTodo] = useState({});

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    else {
      return [];
    }
  });

  // Function to Add New Todo

  const addTodo = (text, dtValue) => {
    const newTodos = [...todos, { id: todos.length + 1, text: text, ttl: dtValue, isDone: false }];
    setTodos(newTodos);
  };

  // Function to Remove Todo

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  }

  // Function to Mark Todo as Complete

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  // Function to Edit Todo

  const editTodo = todo => {
    setIsEditing(true);
    setcurrentTodo({ ...todo })
  }

  // Function to Sort Todo

  const sortData = (event) => {
    const selectedValue = event.target.value;

    // Ascending Order
    if (selectedValue === "ascending") {
      const strAscending = [...todos].sort((a, b) =>
        a.text > b.text ? 1 : -1,
      );
      setTodos(strAscending);
    }

    // Descending Order
    else if (selectedValue === "descending") {
      const strDescending = [...todos].sort((a, b) =>
        a.text > b.text ? -1 : 1,
      );
      setTodos(strDescending);
    }

    // By Date & Time
    else if (selectedValue === "date") {
      const strDate = [...todos].sort((a, b) =>
        new Date(a.ttl) - new Date(b.ttl));
      setTodos(strDate);
    }
  }

  // Update LocalStorage when 'todos' changes using useEffect()

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);


  return (
    <div className="app">
      <div className="container">

        {/* Form to Add or Edit Todo */}

        <FormTodo addTodo={addTodo} isEditing={isEditing} setIsEditing={setIsEditing} currentTodo={currentTodo} setcurrentTodo={setcurrentTodo} todos={todos} setTodos={setTodos} />

        {/* Sorting*/}

        <div className="row justify-content-end">
          <div className="col-md-4 my-4">
            <select onChange={sortData} className="form-select">
              <option>Sort By</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="date">Date & Time</option>
            </select>
          </div>
        </div>

        {/* Diplay Todo */}

        <div>
          {todos.map((todo, index) => (
            <Card key={index} className="my-2">
              <Card.Body>
                <Todo
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo} />
              </Card.Body>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;