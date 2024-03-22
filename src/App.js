import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";
import "./App.css";
import Schedule from "./components/Schedule";
import Schedules from "./components/Schedules";

const client = new ApolloClient({
  uri: "http://localhost:5000/schedule",
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      {<Schedule></Schedule>}
      <Schedules
        title="Upcoming Schedules"        
      ></Schedules>
    </ApolloProvider>
  );
}

export default App;
