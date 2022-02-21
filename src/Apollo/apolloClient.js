import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  split,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import packageJson from "../../package.json";
import { CONFIG } from "../Constants";
import auth from "../Helpers/auth";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
// import CONFIG from '../Config';
import APP_FLOW_ACTIONS from "../Constants";
import emitter from "../Utils/eventEmitter";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/graphql",
  options: {
    reconnect: true,
  },
});
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

const cache = new InMemoryCache({ addTypename: false });

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const createClient = async (
  isUsingCache = false,
  isNotShowDisconnect = false
) => {
  try {
    const token = auth.getToken();
    // console.log({ token });
    // const currentSession = await Auth.currentSession();
    // const token = currentSession.accessToken.jwtToken;
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
        "access-token": token,
        // token,
      },
    }));
    return new ApolloClient({
      link: authLink.concat(
        ApolloLink.from([
          onError(
            ({ graphQLErrors, networkError, response, operation, forward }) => {
              if (graphQLErrors) {
                _.map(graphQLErrors, ({ message, extensions }) => {
                  console.log({ errMes: message });
                  if (
                    _.includes(message, "403") ||
                    _.includes(message, "400") ||
                    extensions.code === "UNAUTHENTICATED"
                  ) {
                    emitter.emit(APP_FLOW_ACTIONS.LOGOUT_REQUEST);
                  }
                });
              } else if (networkError) {
                console.error(`[Network error]: ${networkError}`);
                // if (!isNotShowDisconnect) {
                // openPopupDisconnect();
                // }
                throw networkError;
              }
            }
          ),
          new HttpLink({
            uri: CONFIG.APOLLO_HOST_URL,
            credentials: "same-origin",
          }),
        ])
        // ({ query }) => {
        //   const definition = getMainDefinition(query);
        //   return (
        //     definition.kind === "OperationDefinition" &&
        //     definition.operation === "subscription"
        //   );
        // },
        // wsLink
      ),
      // link: ApolloLink.from([splitLink]),
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
      name: "web",
      version: packageJson.version,
      // client: new SubscriptionClient("ws://localhost:8080/graphql", {
      //   reconnect: true,
      // }),
    });
  } catch (error) {
    throw error;
  }
};

export const client = new ApolloClient({
  link: new HttpLink({
    uri: CONFIG.APOLLO_HOST_URL,
    credentials: "same-origin",
  }),
  cache,
  defaultOptions,
});

export default createClient;
