import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { TemaProvider } from "./hooks/temaContext.tsx";

const httpLink = new HttpLink({
  // uri: 'http://localhost:4000/graphql',
  // uri: "https://neofrota-api.vercel.app/graphql",
  uri: "https://api.neofrota.com/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <TemaProvider>
        <App />
      </TemaProvider>
    </ApolloProvider>
  </StrictMode>,
);
