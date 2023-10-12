import { useState } from "react";

export default function App() {
  const [item, setItem] = useState([]);
  function handleAdditems(item) {
    setItem((items) => [...items, item]);
  }
  function handleDeleteitems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleitems(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearlist() {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onhandleAdditems={handleAdditems} />
      <PackingList
        items={item}
        onDeleteitems={handleDeleteitems}
        onToggleitems={handleToggleitems}
        onClearList={handleClearlist}
      />
      <Stats items={item} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onhandleAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onhandleAdditems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do your need for trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteitems, onToggleitems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedList;

  if (sortBy === "input") sortedList = items;

  if (sortBy === "description") {
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteitems={onDeleteitems}
            onToggleitems={onToggleitems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by packed order</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteitems, onToggleitems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleitems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteitems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items.🛒</em>
      </p>
    );
  const numItem = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const percPacked = Math.round((itemPacked / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {percPacked === 100
          ? "You are good to go ✈️"
          : `💼 You have ${numItem} item on your list and you have already packed ${itemPacked}(${percPacked}%)`}
      </em>
    </footer>
  );
}
