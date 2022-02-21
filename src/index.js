import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { sessionService } from "redux-react-session";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo/apolloClient";

import App from "./App";
import configureStore from "./Redux/Store";

const store = configureStore();
sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
