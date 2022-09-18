// noinspection JSValidateTypes
let socket = io()

socket.on("connect", () => {
	socket.emit("isHost", false)
})

document.getElementById("join").addEventListener("click", _ => {
	socket.emit("selectedHost", document.getElementById("id").value)
	socket.on("play", url => {
		document.getElementById(
			"container"
		).innerHTML = `<iframe src="${url}" style="display: none" allow="autoplay"></iframe>`
	})
	socket.on("joined", _ => {
		swal({
			title: "Join Successful",
			text: "Keep this tab focused to ensure audio plays",
			icon: "success",
			button: false,
			closeOnClickOutside: false,
		})
	})
})
