import React, { useState, useMemo, useCallback, memo } from "react";

const Child = ({ value, onClick }) => {
  console.log("🔁 Child 렌더링");
  return (
    <div>
      <p>값: {value}</p>
      <button onClick={onClick}>자식 버튼</button>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const computedValue = count * 2;

  const handleClick = () => console.log("Clicked");


  return (
    <div>
      <h1>🔄 부모 컴포넌트</h1>
      <button onClick={() => setCount((c) => c + 1)}>카운트 증가</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트 입력"
      />
      <Child value={computedValue} onClick={handleClick} />
    </div>
  );
}
