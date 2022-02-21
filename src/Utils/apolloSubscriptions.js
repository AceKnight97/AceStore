// import { Auth } from "aws-amplify";
import { io } from "socket.io-client";

import { EMITTER_CONSTANTS, CONFIG } from "../Constants";
import auth from "../Helpers/auth";
import emitter from "./eventEmitter";

class ApolloSubscriptions {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connectToServer = () => {
    if (!this.socket) {
      this.socket = io("http://localhost:8081", {
        forceNew: true,
        transports: ["websocket"],
      });
      this.socket.on("connect", this.connectListener);
    }
  };

  connectListener = async () => {
    try {
      this.socket.emit("hello", auth.getToken());
      this.socket.on("aaa", (mes) => {
        console.log({ mes });
      });
      console.log("Socket IO is connected");
    } catch (error) {
      console.log("Failed to connect: ", error);
    }
  };

  disconnectListener = async (error) => {
    console.log("disconnectListener", error);

    this.isConnected = false;

    this.socket.io.on("reconnect", this.reconnectListener);

    this.socket.off("connect");
    this.socket.off("disconnect");

    this.socket.off("NewCarePlan");

    // try {
    //   const currentSession = await Auth.currentSession();
    //   const token = currentSession.accessToken.jwtToken;
    //   if (error && error.trim() === 'ping timeout' && !token) {
    //     this.disconnectSocket();
    //     this.socket = null;
    //   }
    // } catch (error) {
    //   console.log('Failed to disconecet Socket: ', error);
    // }
  };

  reconnectListener = () => {
    console.log("Socket IO is reconnected");
    this.socket.on("connect", this.connectListener);
    window.location.reload();
  };

  joinListener = (msg) => {
    console.log("joinListener", { msg });
  };

  leaveListener = (msg) => {
    console.log("leaveListener", { msg });
  };

  newCarePlanListener = (msg) => {
    console.log("aaa", { msg });
    emitter.emit(EMITTER_CONSTANTS.NEW_CARE_PLAN, msg);
  };

  joinRoom = (id) => {
    this.intervalEmitJoinEvent("join", id);
  };

  intervalEmitJoinEvent = (status, id) => {
    if (this.isConnected) {
      this.socket.emit(status, id);
    } else {
      const interval = setInterval(async () => {
        if (this.isConnected) {
          this.socket.emit(status, id, this.joinListener);
          clearInterval(interval);
        }

        // const currentSession = await Auth.currentSession();
        // const token = currentSession.accessToken.jwtToken;
        // if (!token) {
        //   clearInterval(interval);
        // }
      }, 1000);
    }
  };

  leaveRoom = (id) => {
    if (this.socket && this.isConnected) {
      console.log({ id });
      this.socket.emit("leave", id, this.leaveListener);
    }
  };

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = null;
    this.isConnected = false;
    console.log("Socket IO is disconnected");
  }
}

const apolloSubscriptions = new ApolloSubscriptions();

export default apolloSubscriptions;
