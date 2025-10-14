import { Elysia } from "elysia";
import  ws  from "@elysiajs/websocket";

const app = new Elysia()
  .get("/", () => "Backend OK!")
  .ws("/chat", {
    open(ws) {
      ws.subscribe("chat");
    },
    message(ws, message) {
      ws.publish("chat", message);
    },
  })
  .listen(3001);

console.log("🚀 Elysia running on http://localhost:3001");