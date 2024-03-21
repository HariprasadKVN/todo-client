import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_TODOS } from "./TodoList";

const ADD_TODO = gql`
  mutation addTodo($title: String!, $completed: Boolean!) {
    addTodo(title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const Schedule = () => {
  const [title, setTitle] = useState("");
  const completed = false;

  const [addTodo] = useMutation(ADD_TODO, {
    variables: { title, completed },
    refetchQueries: [{ query: GET_TODOS }],
  });

  // const [addTodo] = useMutation(ADD_TODO, {
  //   update(cache, { data: { addTodo } }) {
  //     cache.modify({
  //       fields: {
  //         todos(existingTodos = []) {
  //           const newTodoRef = cache.writeFragment({
  //             id: "65f9b0cd587e37ddc7e8bc7c",
  //             data: addTodo,
  //             fragment: gql`
  //               fragment NewTodo on Todo {
  //                 id
  //                 title
  //                 completed
  //               }
  //             `,
  //           });
  //           return [...existingTodos, newTodoRef];
  //         },
  //       },
  //     });
  //   },
  // });

  const UPDATE_DOCUMENT = gql`
    mutation updateDocument($id: ID!, $title: String!, $completed: Boolean!) {
      updateDocument(id: $id, title: $title, completed: $completed) {
        id
        title
      }
    }
  `;

  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  //const [addTodo ] = useMutation(ADD_TODO);

  async function handleUpdateDocument(id, title, completed) {
    try {
      const { data } = await updateDocument({
        variables: { id, title, completed },
      });
      console.log("Document updated:", data.updateDocument);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    //handleUpdateDocument('65f9362b17c7431440cd9323','Some other new title', true);
    addTodo();
    // addTodo({
    //   variables: { title: "test 15", completed: true },
    // });
    setTitle("");
  };
  return (
    <>
      {/* <form className="form-group">
        <label>Enter Task</label>
        <input
          className="form-control"
          placeholder="Enter the task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <button className="btn btn-primary" onClick={onSubmit}>
          {" "}
          Add Task{" "}
        </button>
      </form> */}
      <div className="card m-1 p-2">
        <form className="form-group">
          <label>When</label>
          <input className="form-control" type="datetime-local" />
          <label>Name of Patient</label>
          <input
            className="form-control"
            placeholder="Patient's Name"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />

          <div className="row">
            <div className="col-3">
              <label>Age</label>
              <input
                className="form-control"
                placeholder="Patient Age"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
            <div className="col">
              <label>Gender</label>
              <select className="form-control">
                <option>Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col">
              <label>Contact Number</label>
              <input
                className="form-control"
                placeholder="Contact Number"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Doctor</label>
              <input
                className="form-control"
                placeholder="Enter the Doctor"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={onSubmit}>
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
export default Schedule;
