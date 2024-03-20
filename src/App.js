import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoForm";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return <ApolloProvider client={client}>
    <TodoAddForm></TodoAddForm>
    <TodoList></TodoList>
  </ApolloProvider>;
}

export default App;
