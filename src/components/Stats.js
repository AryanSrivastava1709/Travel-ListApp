export default function Stats({ items }) {
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
