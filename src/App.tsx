import "./assets/style.css";
import React, {useEffect, useRef, useState} from "react";

const itemData = [
  "우유",
  "라면",
]
// localStorage.removeItem('items')
const initialItems = itemData.map(item => ({ name: item, completed: false }));

function App() {
  let stringLocalItems = localStorage.getItem('items');
  if (!stringLocalItems) {
    localStorage.setItem('items', JSON.stringify(initialItems))
    stringLocalItems = JSON.stringify(initialItems)
  }
  const localItems = JSON.parse(stringLocalItems)
  const [items, setItems] = useState(localItems)
  const inputRef = useRef<HTMLInputElement>(null);
  const removeRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleRemove = (idx: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const updatedItems = items.filter((_: any, i: number) => idx !== i)
    setItems(updatedItems)
  }

  const handleCheck = (idx: number) => {
    const updatedItems = items.map((item: any, i: number) => {
          return i === idx ? {...item, completed: !item.completed} : item;
        }
    );
    setItems(updatedItems);
  };

  const handleAdd = () => {
    const item = inputRef.current!.value;
    const errorMsg = document.getElementById('error-msg') as HTMLElement;
    if (!item) {
      errorMsg.textContent = "* 입력값이 없습니다."
      return;
    }
    errorMsg.textContent = ""
    const updatedItems = [...items, { name: item, completed: false }]
    inputRef.current!.value = "";
    setItems(updatedItems);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="outer">
        <div className="shopping">shopping</div>

        <ul className="all-list">
          {items.map((item: any, idx: number) => (
              <li key={idx} className="custom-li">
                <button className="check">
                  <i className="fa fa-circle-check"></i>
                </button>
                <div
                    className={`title shop-item ${item.completed ? 'completed' : ''}`}
                    onClick={() => handleCheck(idx)}
                >
                  <span>{item.name}</span>
                  <button
                      className="delete"
                      ref={(el) => (removeRefs.current[idx] = el)}
                      onClick={(event) => handleRemove(idx, event)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </li>
          ))}
        </ul>

        <div className="write">
          <input
              ref={inputRef}
              style={{
                height: "60%",
                fontSize: "2rem",
                width: "100%",
                borderRadius: "0.5rem",
                border: "none"
              }}
              placeholder='입력하세요.'
              autoFocus={true}
              onKeyDown={handleKeyDown}
          />
          <div className="item-add-button"
               onClick={() => handleAdd()}>
            <i className="fa fa-square-plus"></i>
          </div>
          <div id="error-msg"></div>
        </div>
      </div>
    </>
  );
}

export default App;


