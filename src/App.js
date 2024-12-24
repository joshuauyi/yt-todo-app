import { useState, useCallback, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './App.css';

function App() {

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('todoListItems') || '[]')
  );

  const addItem = useCallback((text) => {
    setItems(oldItems => [
      ...oldItems,
      { text, completed: false, id: Date.now() }
    ]);
  }, []);

  const updateItem = useCallback((id, newValues) => {
    setItems(oldItems => {
      const targetItemIx = oldItems.findIndex(item => item.id === id);

      if (targetItemIx ===  -1) return oldItems;

      const targetItem = oldItems[targetItemIx];
      const newItems = [...oldItems];
      
      newItems[targetItemIx] = { ...targetItem, ...newValues };
      return newItems;
    });
  }, []);

  const deleteItem = useCallback((id) => {
    setItems(oldItems => oldItems.filter(item => item.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem('todoListItems', JSON.stringify(items));
  }, [items])

  return (
    <div className="container">
      <h1>My Todo List</h1>
      <TodoForm onAddItem={addItem} />
      {items.map(item => (<TodoItem 
        key={item.id}
        item={item} 
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem} />)
      )}
    </div>
  );
}

export default App;
