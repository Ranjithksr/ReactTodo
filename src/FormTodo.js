import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import { Form, Button, FormControl } from 'react-bootstrap';

export default function FormTodo({ addTodo, isEditing, setIsEditing, currentTodo, setcurrentTodo, todos, setTodos }) {

    const [datetimeValue, ondtChange] = useState(new Date());
    const [value, setValue] = useState("");

    const addSubmit = e => {
        e.preventDefault();
        addTodo(value, datetimeValue.toLocaleString());
        setValue("");
        ondtChange(new Date());
    }

    const editSubmit = e => {
        e.preventDefault();
        const updatedItem = todos.map((todo) => {
            return todo.id === currentTodo.id ? currentTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }


    return (
        isEditing ? (
            <div>
                <h2 className="text-center">Todo List</h2>
                <Form onSubmit={editSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Edit Todo</Form.Label>
                        <FormControl type="text" value={currentTodo.text} onChange={e => setcurrentTodo({ ...currentTodo, text: e.target.value })} required />
                        <Form.Label className="mt-2">Set Expiry Date & Time:</Form.Label>
                        <DateTimePicker className="mx-md-2" onChange={e => setcurrentTodo({ ...currentTodo, ttl: e.toLocaleString() })} value={new Date(currentTodo.ttl)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div >
        ) : (
            <div>
                <h2 className="text-center">Todo List</h2>
                <Form onSubmit={addSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Todo</Form.Label>
                        <FormControl type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Add New Todo" required />
                        <Form.Label className="mt-2">Set Expiry Date & Time:</Form.Label>
                        <DateTimePicker className="mx-md-2" onChange={ondtChange} value={datetimeValue} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        )

    );
}