import { Server } from "socket.io";

const createSocketServer = (server) => {
    if (server) {
        const io = new Server(server);

        io.on("connection", (socket) => {
            console.log("Connected to socket.io", socket.id);

            socket.on("orderpage", (data) => {
                console.log(data);
                // io.emit("new", "Message from server.")
                socket.join(data);
                io.to(data).emit("data", "My name is a "+data)
            })

            

        })


    }
}

export default createSocketServer;

