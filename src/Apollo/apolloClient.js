import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import packageJson from "../../package.json";
// import CONFIG from '../Config';
import APP_FLOW_ACTIONS, { CONFIG } from "../Constants";
import auth from "../Helpers/auth";
import emitter from "../Utils/eventEmitter";

const { APOLLO_HOST_URL } = CONFIG;

const isLocal = APOLLO_HOST_URL.includes("localhost") ? "" : "s";

const httpLink = new HttpLink({
  uri: `http${isLocal}://${APOLLO_HOST_URL}`,
  credentials: "same-origin",
});

const wsLink = new WebSocketLink({
  uri: `ws${isLocal}://${APOLLO_HOST_URL}`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

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
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        "access-token": token,
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
          httpLink,
        ])
      ),
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
      name: "web",
      version: packageJson.version,
    });
  } catch (error) {
    throw error;
  }
};

export const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
});

export default createClient;
