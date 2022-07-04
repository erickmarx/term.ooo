import { Server } from "socket.io";
import { App } from "./src/app";

const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  const app = new App();
  console.log("conectado");
  socket.on("insert:word", (word: string) => {
    app.execute(word);
    socket.emit("insert:word", app.inputedWord);
  });
});

io.listen(3000);
console.log("started");
