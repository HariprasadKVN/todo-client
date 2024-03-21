import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoForm";
import Schedule from "./components/Schedule";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      Subscriber: Pat Smith Policy: 1N32CB
      <div>
        Schedule an Appointment
        <Schedule ></Schedule>
      </div>
      <div>
        Schedules: List of upcoming appoints
        <table className="table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Provider Name</th>
              <th>When</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mon - Aug 10, 2024 10:30 AM</td>
              <td>Patient</td>
              <td>Provider</td>
              <td>Change/Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <TodoAddForm></TodoAddForm>
    <TodoList></TodoList> */}
    </ApolloProvider>
  );
}

export default App;
