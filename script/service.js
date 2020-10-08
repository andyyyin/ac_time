const timeTransform = (time) => {
	let hour = Math.floor(time / (1000 * 60 * 60))
	let minute = Math.floor(time % (1000 * 60 * 60) / (1000 * 60))
	let second = Math.floor(time % (1000 * 60) / 1000)
	return {hour, minute, second}
}