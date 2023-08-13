import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import Loader from "./components/Loader/Loader";

const App = () => {
  const [completeScreen, setCompleteScreen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoSubject, setTodoSubject] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubject, setEditedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodoList = () => {
    if (editingIndex == -1) {
      if (todoTitle === "" || todoSubject === "") {
        alert("Please enter both title and subject");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      const newTodoData = {
        title: todoTitle,
        subject: todoSubject,
      };

      let updatedTodoArray = [...todoList];

      if (editingIndex !== -1) {
        // Update existing task
        updatedTodoArray[editingIndex] = {
          ...updatedTodoArray[editingIndex],
          title: editedTitle,
          subject: editedSubject,
        };

        setEditingIndex(-1);
      } else {
        // Add new task
        updatedTodoArray.push(newTodoData);
      }

      setTodoList(updatedTodoArray);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoArray));
      setLoading(false);
      setTodoTitle("");
      setTodoSubject("");
      setEditedTitle("");
      setEditedSubject("");
    }, 500);
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    const todo = todoList[index];
    setEditedTitle(todo.title);
    setEditedSubject(todo.subject);
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...todoList];
    reduceTodo.splice(index, 1);
    setTodoList(reduceTodo);
    localStorage.setItem("todoList", JSON.stringify(reduceTodo));
  };

  const handleCompletedTodo = (index) => {
    const now = new Date();
    const dd = now.getDate();
    const mm = now.getMonth() + 1;
    const yyyy = now.getFullYear();
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    let ampm = "AM";
    if (h >= 12) {
      ampm = "PM";
      if (h > 12) {
        h -= 12;
      }
    }
    if (h === 0) {
      h = 12;
    }
    const completedOnTime = `${h}:${m}:${s}s ${ampm} ${dd}-${mm}-${yyyy}`;

    let filterItem = { ...todoList[index], completedOnTime: completedOnTime };
    let completedArray = [...completedTodo];
    completedArray.push(filterItem);
    setCompletedTodo(completedArray);
    handleDeleteTodo(index);
    localStorage.setItem("completeTodoList", JSON.stringify(completedArray));
  };

  const deleteCompletedTodo = (index) => {
    let reduceTodo = [...completedTodo];
    reduceTodo.splice(index, 1);
    setCompletedTodo(reduceTodo);
    localStorage.setItem("completeTodoList", JSON.stringify(reduceTodo));
  };

  useEffect(() => {
    const savedTodoListData = JSON.parse(localStorage.getItem("todoList"));
    const savedCompletedTodoList = JSON.parse(
      localStorage.getItem("completeTodoList")
    );

    if (savedTodoListData) {
      setTodoList(savedTodoListData);
    }

    if (savedCompletedTodoList) {
      setCompletedTodo(savedCompletedTodoList);
    }
  }, []);

  return (
    <>
      <div className="todo_app">
        <div className="container">
          <div className="title text-white mb-5">
            <h2>My Todos</h2>
          </div>
          <div className="row mx-2">
            <div className="col-md-5">
              <div className="todo_input_item mb-3">
                <label htmlFor="Tilte">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingIndex !== -1 ? editedTitle : todoTitle}
                  className="form-control"
                  placeholder="What's the task title?"
                  onChange={(e) =>
                    editingIndex !== -1
                      ? setEditedTitle(e.target.value)
                      : setTodoTitle(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="todo_input_item">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  name="subject"
                  value={editingIndex !== -1 ? editedSubject : todoSubject}
                  className="form-control"
                  placeholder="What's the task description?"
                  onChange={(e) =>
                    editingIndex !== -1
                      ? setEditedSubject(e.target.value)
                      : setTodoSubject(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="todo_wrapper">
                <label htmlFor="Description"></label> <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addTodoList}
                >
                  {editingIndex !== -1 ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>

            <hr className="hr" />
            <div className="btn_area mt-2 mb-3">
              <button
                type="button"
                className={`secondaryBtn ${
                  completeScreen === false && "active"
                }`}
                onClick={() => setCompleteScreen(false)}
              >
                Todo
              </button>
              <button
                type="button"
                className={`secondaryBtn ${
                  completeScreen === true && "active"
                }`}
                onClick={() => setCompleteScreen(true)}
              >
                Completed
              </button>
            </div>
            {loading ? (
              <div className="loading-section d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              completeScreen === false &&
              todoList?.map((todoContent, index) => (
                <div className="todo_list mb-2" key={index}>
                  <div className="todo_list_item text-white mt-2">
                    <div className="">
                      <h4>{todoContent.title}</h4>
                      <p>{todoContent.subject}</p>
                    </div>
                    <div className="icons">
                      <AiOutlineDelete
                        className="delete_icon"
                        title="Deleted Todo"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <BiSolidEdit
                        className="edit_icon ms-2"
                        title="Edit Todo"
                        onClick={() => handleEditTodo(index)}
                      />
                      <BsCheck2Circle
                        title="Completed Todo"
                        className="check_icon"
                        onClick={() => handleCompletedTodo(index)}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            {completeScreen === true &&
              completedTodo?.map((todoContentCom, index) => (
                <div className="todo_list mb-2" key={index}>
                  <div className="todo_list_item text-white mt-2">
                    <div>
                      <h4>{todoContentCom.title}</h4>
                      <p>{todoContentCom.subject}</p>
                      <p>
                        <small>
                          Completed on : {todoContentCom.completedOnTime}
                        </small>
                      </p>
                    </div>
                    <div className="completed_icons">
                      <AiOutlineDelete
                        title="Deleted Todo"
                        className="delete_icon"
                        onClick={() => deleteCompletedTodo(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
