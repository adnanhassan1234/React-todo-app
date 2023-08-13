import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CompletedTodo = (props) => {
  const { completeScreen, completedTodo, deleteCompletedTodo } = props;
  return (
    <>
      {completeScreen === true &&
        completedTodo?.map((todoContentCom, index) => (
          <div className="todo_list mb-2" key={index}>
            <div className="todo_list_item text-white mt-2">
              <div>
                <h4>{todoContentCom.title}</h4>
                <p>{todoContentCom.subject}</p>
                <p>
                  <small>Completed on : {todoContentCom.completedOnTime}</small>
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
    </>
  );
};

export default CompletedTodo;
