import React, { useState, useReducer, useEffect } from "react";
import reducer from "./reducer";
import Modal from "./modal";

// default properties and values of usereducer
const defaultState = {
  item: store(),
  isMuch: false,
  hasModal: false,
  modalContent: "",
};

// using local storage to store the array of items
function store() {
  const list = localStorage.getItem("item");
  if (list) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
}

function App() {
  const [todo, setTodo] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  // saving the array
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(state.item));
  }, [state.item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      // add id property beside the value
      const newTodo = { id: new Date().getTime().toString(), todo };
      dispatch({ type: "ADD_TODO", extra: newTodo });
      // using ternary operator to set if the number of items are much
      state.item.length > 1 ? (state.isMuch = true) : (state.isMuch = false);
      // clearing input writter value after submiting
      setTodo("");
    } else {
      dispatch({ type: "EMPTY" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <section className='container'>
        <h2 className='title'>To Do List</h2>
        <form onSubmit={handleSubmit} className='form'>
          {state.hasModal && (
            <Modal modalContent={state.modalContent} close={closeModal} />
          )}
          <div className='addPart'>
            <input
              className='input'
              type='text'
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            />
            <button className='submit' type='submit'>
              ADD
            </button>
          </div>
        </form>
        {/* shows the submitted items */}
        {state.item.map((todo) => {
          return (
            <div key={todo.id} className='added'>
              {todo.todo}
              <span className='remove-btn'>
                <button
                  className='btn'
                  onClick={() => {
                    dispatch({ type: "REMOVE", id: todo.id });
                  }}
                >
                  REMOVE
                </button>
              </span>
            </div>
          );
        })}
        {/* if the items are much, clear all button will be displayed */}
        {state.isMuch && (
          <button
            className='btn clear'
            onClick={() => {
              dispatch({ type: "CLEAR_ALL" });
            }}
          >
            CLEAR ALL
          </button>
        )}
      </section>
    </>
  );
}

export default App;
