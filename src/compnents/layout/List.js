import React from 'react';

const List = (props) => {
    const { todos, handleCheck, handleEditClick, handleDeleteClick } = props;
    return (
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
    )
};

export default List;
