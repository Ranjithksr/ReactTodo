import { useEffect } from "react";
import { Button } from 'react-bootstrap';

export default function Todo({ todo, index, removeTodo, markTodo, editTodo }) {

    const ttl = new Date(todo.ttl);
    const curDate = new Date();

    // Find Difference Between Two Dates in Milliseconds

    const dif = Math.abs(curDate - ttl);

    // useEffect Hook to Execute setTimeout() when 'todo' Changes

    useEffect(() => {
        setTimeout( () => { removeTodo(index) }, dif);
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