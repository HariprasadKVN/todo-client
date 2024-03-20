"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaUndo } from "react-icons/fa";
import { MdDone } from "react-icons/md";

export const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      title
      completed
    }
  }
`;

// const GET_TODOS = gql`
//   query getTodos {
//     todos {
//       id
//       title
//       completed
//     }
//   }
// `;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Lodaing</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h3>Page</h3>
      {!loading && !error && (
        <table className="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Todo</th>
              <th colSpan={5}>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((e, index) => (
              <DataRow key={index} id={e.id} title={e.title}></DataRow>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const DataRow = (props) => {
  const [title, setTitle] = useState(props.title);

  const UPDATE_DOCUMENT = gql`
    mutation updateDocument($id: ID!, $title: String!, $completed: Boolean!) {
      updateDocument(id: $id, title: $title, completed: $completed) {
        id
        title
      }
    }
  `;

  const DELETE_TODO = gql`
    mutation deleteTodo($id: ID) {
      deleteTodo(id: $id) {
        id
      }
    }
  `;

  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  const [deleteTodo] = useMutation(DELETE_TODO);

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

  const onSubmit = (id, title) => {
    handleUpdateDocument(id, title, true);
  };

  async function handleDeleteTodo(id) {
    try {
      const { data } = await deleteTodo({
        variables: { id },
      });
      console.log("Document updated:", data.updateDocument);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  const onDelete = (id) => {
    alert("Delete");
    handleDeleteTodo(id);
  };

  return (
    <tr>
      <td>
        <input
          style={{ width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <FaEdit />
      </td>
      <td>
        <FaSave className="text-secondary"
          onClick={() => {
            onSubmit(props.id, title);
          }}
        />
      </td>
      <td>
        <FaUndo className="text-secondary"/>
      </td>
      <td>
        <FaTrash
          onClick={() => {
            onDelete(props.id);
          }}
        />
      </td>
      <td>
        <MdDone />
      </td>
    </tr>
  );
};

export default TodoList;
