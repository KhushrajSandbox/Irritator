const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
app.use(express.static("public"));
server.listen(process.env.PORT || 5000, _ => {
    console.log("Listening on port " + (process.env.PORT || "5000"))
})

// Format:
// [
//     // HostID = index
//     {
//         hostSocket: socket,
//         audioUrl: string,
//         clients: [
//             socket,
//             socket,
//             ...
//         ],
//     }
// ]

let hosts = []

io.on("connection", socket => {
    console.log("Connected: " + socket.id)

    socket.on("isHost", yes => {
        if (yes) {
            console.log("Type: Host")
            const hostId = hosts.length
            socket.emit("id", hostId)
            hosts.push({hostSocket: socket, audioUrl: "", clients: []})
            socket.on("url", url => {
                hosts[hostId].audioUrl = url
                play(hostId)
            })
            socket.on("disconnect", _ => {
                console.log("Host disconnected: " + socket.id)
                hosts[hostId].hostSocket = false
            })
        } else {
            console.log("Type: Client")
            socket.on("selectedHost", hostId => {
                hosts[hostId].clients.push(socket)
                hosts[hostId].hostSocket.emit("clients", hosts[hostId].clients.length)
                socket.emit("joined")
                socket.on("disconnect", _ => {
                    console.log("Client disconnected: " + socket.id)
                    const index = hosts[hostId].clients.indexOf(socket);
                    if (index > -1) {
                        hosts[hostId].clients.splice(index, 1);
                    }
                    play(hostId)
                })
            })
        }
    })
})


function play(hostId) {
    if (hosts[hostId].clients.length > 0) {
        hosts[hostId].clients[0].emit("play", hosts[hostId].audioUrl)
    } else {
        hosts[hostId].hostSocket.emit("play", hosts[hostId].audioUrl)
    }
}
