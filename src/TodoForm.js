import { useState } from 'react';

const TodoForm = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddItem(text);
    setText('');

  }

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input type="text" name="text"
        value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoForm;
