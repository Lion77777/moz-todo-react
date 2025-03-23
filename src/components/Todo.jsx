import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);

    setNewName('');
    setEditing(false);
  }

  const editingTemplate = (
    <form action="" className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={props.id} className="todo-label">
          New name for {props.name}
        </label>
        <input type="text" 
              className="todo-text" 
              id={props.id} value={newName} 
              onChange={handleChange}
              ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button className="btn todo-cancel" type='button' onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button className="btn btn__primary todo-edit" type="submit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input type="checkbox"
                id={props.id}
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)} 
        />
        <label htmlFor={props.id} className="todo-label">{props.name}</label>
      </div>
      <div className="btn-group">
        <button className="btn" 
                type="button" 
                onClick={() => setEditing(true)}
                ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button className="btn btn__danger"
                type="button"
                onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if(!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if(wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;