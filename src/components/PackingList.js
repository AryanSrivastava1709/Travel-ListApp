import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteitems,
  onToggleitems,
  onClearList,
}) {
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
