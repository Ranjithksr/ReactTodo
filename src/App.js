import { useEffect, useState } from "react";
import { Form, Button, FormControl, Card } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function FormTodo({ addTodo }) {
  const [datetimeValue, ondtChange] = useState(new Date());
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const dtValue = datetimeValue.toLocaleString();
    addTodo(value, dtValue);
    setValue("");
    ondtChange(new Date());
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Add Todo</Form.Label>
        <FormControl type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Add New Todo" required />
        <Form.Label className="mt-2">Set Expiry Date & Time:</Form.Label>
        <DateTimePicker className="mx-md-2" onChange={ondtChange} value={datetimeValue} />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
}


function Todo({ todo, index, removeTodo, markTodo, editTodo }) {

  const ttl = new Date(todo.ttl);
  const curDate = new Date();

  let dif = Math.abs(curDate - ttl);
  console.log(dif);

  useEffect(() => {
    setTimeout(() => { removeTodo(index) }, dif);
  }, [todo])


  return (
    <div className="row todo" index={todo.index}>
      <div className="col-md-6">
        <span className="" style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      </div>
      <div className="col">
        <span>Expires On: {todo.ttl}</span>
      </div>
      <div className="col">
        <Button variant="primary m-2" onClick={() => editTodo(todo)}>Edit</Button>
        <Button variant="outline-success m-2" onClick={() => markTodo(index)}>✓</Button>
        <Button variant="outline-danger m-2" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}


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

  const addTodo = (text, dtValue) => {
    const newTodos = [...todos, { id: todos.length + 1, text: text, ttl: dtValue, isDone: false }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  }

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  const editTodo = todo => {
    setIsEditing(true);
    setcurrentTodo({ ...todo })
  }

  const sortData = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "ascending") {
      const strAscending = [...todos].sort((a, b) =>
        a.text > b.text ? 1 : -1,
      );
      setTodos(strAscending);
    }
    else if (selectedValue === "descending") {
      const strDescending = [...todos].sort((a, b) =>
        a.text > b.text ? -1 : 1,
      );
      setTodos(strDescending);
    }

    else if (selectedValue === "date") {
      const strDate = [...todos].sort((a, b) =>
        new Date(a.ttl) - new Date(b.ttl) );
      setTodos(strDate);
    }
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  function editinputChange(e) {
    setcurrentTodo({ ...currentTodo, text: e.target.value });
  }

  function handleEdit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  return (
    <div className="app">
      <div className="container">
        {
          isEditing ? (
            <div>
              <h2 className="text-center">Todo List</h2>
              <Form onSubmit={handleEdit}>
                <Form.Group className="mb-3">
                  <Form.Label>Edit Todo</Form.Label>
                  <FormControl type="text" value={currentTodo.text} onChange={editinputChange} required />
                  <Form.Label className="mt-2">Set Expiry Date & Time:</Form.Label>
                  <DateTimePicker className="mx-md-2" onChange={(e) => setcurrentTodo({ ...currentTodo, ttl: e.toLocaleString() })} value={new Date(currentTodo.ttl)} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </div>
          ) : (
            <div>
              <h2 className="text-center">Todo List</h2>
              <FormTodo addTodo={addTodo} />
            </div>
          )
        }
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