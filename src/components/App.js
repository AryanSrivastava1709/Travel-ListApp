import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
