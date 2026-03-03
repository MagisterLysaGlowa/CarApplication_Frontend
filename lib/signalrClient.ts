import { getToken } from "@/app/actions/getToken";
import * as signalR from "@microsoft/signalr";
import { cookies } from "next/headers";
// https://api.yourvehicle.pl/chatHub

const tokenGetter = async () => {
  const token = await getToken();
  return token;
};

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.yourvehicle.pl/chatHub", {
    accessTokenFactory: async () => {
      const token = await tokenGetter();
      if (!token) {
        throw new Error("No access token found");
      }
      return token;
    },
    transport:
      signalR.HttpTransportType.WebSockets |
      signalR.HttpTransportType.LongPolling, // Fallback to long polling
    withCredentials: true,
  })
  .withAutomaticReconnect([0, 2000, 5000, 10000])
  .configureLogging({
    log: (logLevel, message) => {
      if (
        message.includes("Failed to start the transport 'WebSockets'") ||
        message.includes("WebSocket failed to connect") ||
        message.includes("The connection was stopped during negotiation.")
      ) {
        return; // Ignore this specific error
      }
    },
  }) // This helps with automatic reconnection in case of network issues
  .build();

// Start the connection
export const startConnection = async () => {
  try {
    if (hubConnection.state == "Disconnected") {
      await hubConnection.start();
      console.log("✅ SignalR Connected.");
    }
    return true;
  } catch (err) {
    console.error("❌ SignalR Connection Error:", err);
  }
};

// Join a chat with a specific chatId
export const joinChat = async (chatId: number) => {
  try {
    if (hubConnection.state === signalR.HubConnectionState.Connected) {
      console.log(`Attempting to join chat with ID: ${chatId}`);
      // The backend expects the chatId to be passed as a string
      await hubConnection.invoke("JoinChat", chatId.toString());
      console.log(`✅ Successfully joined chat ${chatId}`);
    } else {
      console.log("SignalR connection is not established yet.");
    }
  } catch (error) {
    console.error("Error joining chat:", error);
  }
};

// Listen for incoming messages from the chat group
export const listenForMessages = () => {
  hubConnection.on("ReceiveMessage", (message: any) => {
    console.log("New message received:", message);
    // Here, you can handle the incoming message
  });
};

export { hubConnection };
