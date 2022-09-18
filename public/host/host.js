// noinspection JSValidateTypes
let socket = io()

socket.on("connect", () => {
	socket.emit("isHost", true)
})

socket.on("id", id => {
	document.getElementById("id").innerHTML = `Id: ${id}`
})

socket.on("clients", number => {
	document.getElementById(
		"clients"
	).innerHTML = `Number of Clients: ${number}`
})

document.getElementById("start").addEventListener("click", _ => {
	let parsed = youtube_parser(document.getElementById("url").value)
	if (parsed !== -1) {
		socket.emit(
			"url",
			"https://www.youtube-nocookie.com/embed/" +
				parsed +
				"?autoplay=1&loop=1"
		)
		swal({
			title: "Beginning...",
			text: "Keep this tab focused to ensure audio plays",
			icon: "success",
			buttons: false,
			closeOnClickOutside: false,
		})
		socket.on("play", url => {
			document.getElementById(
				"container"
			).innerHTML = `<iframe src="${url}" style="display: none" allow="autoplay"></iframe>`
		})
	} else {
		// noinspection JSUnresolvedFunction
		swal("Error", "Invalid Url", "error")
	}
})

const youtube_parser = url => {
	let regExp =
		/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
	let match = url.match(regExp)
	if (match && match[2].length === 11) {
		return match[2]
	} else {
		return -1
	}
}
