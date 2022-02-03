import { useEffect, useState } from "react";
import List from "./List";

export default function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    const [todo, setTodo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleInputChange(e) {
        setTodo(e.target.value);
    }

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }
            ]);
        }
        setTodo("");
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);
    }

    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    }

    let todoId = [];
    const handleCheck = (e) => {
        console.log(e, 'e')
        todoId.push(e.id);
        console.log(todoId, 'fr')
    }

    const deleteMarked = () => {
        const removeItem = todos.filter((todo) => {
            console.log(todoId)
            return todo.id !== todoId.map((val) => parseInt(val));
        });
        setTodos(removeItem);
    }

    return (
        <div className="App container">
            {isEditing ? (
                <div class="col mt-md-4">
                    <form className="row g-3" onSubmit={handleEditFormSubmit}>
                        <h2>Edit Todo</h2>
                        <div class="col-10">
                            <input
                                name="editTodo"
                                className="form-control"
                                type="text"
                                placeholder="Create a new Task"
                                value={currentTodo.text}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div class="col-2">
                            <button className="btn btn-primary me-md-2" type="submit">Update</button>
                            <button className="btn btn-primary me-md-2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div class="col mt-md-4">
                    <form className="row g-3" onSubmit={handleFormSubmit}>
                        <h2>Add Todo</h2>
                        <div class="col-11">
                            <input
                                name="todo"
                                className="form-control"
                                type="text"
                                placeholder="Create a new Task"
                                value={todo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div class="col-1">
                            <button className="btn btn-primary" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            )}
            {/* <div class="col-1">
                <button className="btn btn-sm btn-primary" type="submit" onClick={() => deleteMarked()}>Delete all marked</button>
            </div> */}

            {/* <List todos={todos} handleCheck={handleCheck} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> */}
            <ul className="list-group mt-md-4">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                        <input className="form-check-input me-1" type="checkbox" onClick={() => handleCheck(todo)} value=""></input>
                        <div className="ms-2 me-auto">
                            {todo.text}
                        </div>
                        <button className="btn btn-primary me-md-2" type="button" onClick={() => handleEditClick(todo)}>Edit</button>
                        <button className="btn btn-primary " type="button" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}