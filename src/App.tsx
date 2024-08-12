import "./assets/style.css";
import {useRef, useState} from "react";

const itemData = [
    "우유",
    "라면",
    "김치",
]

function App() {
  const [items, setItems] = useState(itemData)
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <>
        <div className="outer">
          <div className="shopping">shopping</div>

          <ul className="all-list">
            {items.map(item => (
                <li className="custom-li">
                  <button className="check custom-button">
                    <i className="fa fa-circle-check"></i>
                  </button>
                  <div className="title shop-item">
                    <span>{item}</span>
                    <button className="delete">
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
            }} />

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


