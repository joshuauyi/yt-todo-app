import { useState, useRef, useEffect } from 'react';

const TodoItem = ({item, onUpdateItem, onDeleteItem}) => {

  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const textInputRef = useRef(null);

  const startEdit = () => {
    if (item.completed) return;

    setEdit(true);
  }

  useEffect(
    () => textInputRef.current?.focus(),
    [edit]
  );

  const saveItem = () => {
    onUpdateItem(item.id, {text: newText});
    setEdit(false);
  }

  const completeItem = (event) => {
    onUpdateItem(item.id, {completed: event.target.checked});
  }
  
  return (<div className="item">
    <input type="checkbox" checked={item.completed} onChange={completeItem} />
    <div className="itemDiv">
      {edit 
        ? <input type="text" value={newText} 
          className="plainInput" 
          onChange={e => setNewText(e.target.value)}
          ref={textInputRef}
          onBlur={saveItem}
          />
        : <p className={"itemName " + (item.completed ? 'crossed' : '')} onClick={startEdit}>{item.text}</p>
      }
    </div>
    <button type="button" onClick={() => onDeleteItem(item.id)} className="plainBtn">&#10005;</button>
  </div>)
}

export default TodoItem;
