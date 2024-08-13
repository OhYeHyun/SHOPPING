import "./assets/style.css";
import {useEffect, useRef, useState} from "react";

const itemData = [
  "우유",
  "라면",
]
// localStorage.removeItem('items')

function App() {
  let stringLocalItems = localStorage.getItem('items');
  if (!stringLocalItems) {
    localStorage.setItem('items', JSON.stringify(itemData))
    stringLocalItems = JSON.stringify(itemData)
  }
  const localItems = JSON.parse(stringLocalItems)
  const [items, setItems] = useState(!localItems ? itemData : localItems)
  const inputRef = useRef<HTMLInputElement>(null);
  const removeRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleRemove = (idx: number) => {
    const updatedItems = items.filter((_: any, i: number) => idx !== i)
    setItems(updatedItems)
  }

  const handleCheck = (idx: number) => {
    const listToCheck = items[idx];
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="outer">
        <div className="shopping">shopping</div>

        <ul className="all-list">
          {items.map((item: string, idx: number) => (
            <li key={idx} className="custom-li">
              <button className="check custom-button">
                <i className="fa fa-circle-check"></i>
              </button>
              <div className="title shop-item">
                <span>{item}</span>
                <button
                  className="delete"
                  ref={(el) => (removeRefs.current[idx] = el)}
                  onClick={() => handleRemove(idx)}
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
            placeholder='아이디를 입력하세요.'
            autoFocus={true}
          />

          <div className="item-add-button"
            onClick={() => {
              const item = inputRef.current!.value;
              inputRef.current!.value = "";
              setItems([...items, item]);
            }}>
            <i className="fa fa-square-plus"></i>
          </div>
         </div>
      </div>
    </>
  );
}

export default App;


