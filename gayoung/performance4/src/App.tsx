import React, { useState, useCallback, memo } from "react";

// 메모이제이션 없는 자식
function NonMemoizedItem({ item, onToggle }) {
  console.log(`🔁 NonMemoizedItem 렌더링: ${item.name}`);
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onToggle(item.id)}>
        {item.favorite ? "★" : "☆"}
      </button>
    </div>
  );
}

// 메모이제이션 된 자식
const MemoizedItem = memo(function MemoizedItem({ item, onToggle }) {
  console.log(`✅ MemoizedItem 렌더링: ${item.name}`);
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onToggle(item.id)}>
        {item.favorite ? "★" : "☆"}
      </button>
    </div>
  );
});

const InputItem = ({filter, setFilter}) => {
  return (
    <input
      type="text"
      value={filter}
      placeholder="필터링용 텍스트"
      onChange={(e) => setFilter(e.target.value)}
    />
  )
}

export default function App() {
  const initialItems = [
    {id: 1, name: "Apple", favorite: false},
    {id: 2, name: "Banana", favorite: false },
    { id: 3, name: "Cherry", favorite: false },
  ];

  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("");

  // ✅ useCallback으로 함수 메모이제이션
  const toggleFavorite = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  }, [])

  return (
    <div>
      <h1>상품 리스트</h1>

      <InputItem filter={filter} setFilter={setFilter}></InputItem>

      <h2>✅ 메모이제이션 된 컴포넌트</h2>
      {items.map((item) => (
        <MemoizedItem key={item.id} item={item} onToggle={toggleFavorite} />
      ))}

      <h2>❌ 메모이제이션 없는 컴포넌트</h2>
      {items.map((item) => (
        <NonMemoizedItem key={item.id} item={item} onToggle={toggleFavorite} />
      ))}
    </div>
  );
}
