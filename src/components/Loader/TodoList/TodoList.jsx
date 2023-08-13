import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import Loader from "../Loader";

const TodoList = (props) => {
  const {
    loading,
    completeScreen,
    todoList,
    handleDeleteTodo,
    handleEditTodo,
    handleCompletedTodo,
  } = props;
  return (
    <>
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
    </>
  );
};

export default TodoList;
