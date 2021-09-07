import React from "react";
import { AppRegistry } from "react-native";
import MyRootComponent from "./Index";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://789b-105-160-37-97.ngrok.io/api",
});

const wsLink = new WebSocketLink({
  uri: "wss://789b-105-160-37-97.ngrok.io/subscriptions",
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

AppRegistry.registerComponent("ChatApplication", () => App);

export default App;
