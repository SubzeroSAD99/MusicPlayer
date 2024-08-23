let items = Array.from(document.querySelectorAll('.items'))
const audios = Array.from(document.querySelectorAll('audio'))

let playBtn = document.querySelector('button#play')

const totalItems = items.length
let currentItem = 1
let isAnim = false

const divActions = document.querySelector('div.actions')
const actionBtn = divActions.querySelectorAll('button')

let playing = false

actionBtn.forEach(btn => {
	const id = btn.getAttribute('id')

	btn.addEventListener('click', () => {
		switch (id) {
			case 'prev':
				if (isAnim) return
				isAnim = true

				prev()
				break

			case 'play':
				if (isAnim) return

				play()
				break

			case 'next':
				if (isAnim) return
				isAnim = true

				next()
				break
		}
	})
})


function play() {
	playing = !playing;

	if (playing) {
		updateIconPlayer()
		audios[currentItem].play()
	} else {
		updateIconPlayer()
		audios[currentItem].pause()
	}
}


function next() {
	currentItem = (currentItem + 1) % totalItems
	updateCarousel()
}

function prev() {
	currentItem = (currentItem - 1 + totalItems) % totalItems
	updateCarousel()
}

async function updateCarousel() {
	hideBtns()
	await delay(200)
	resetAudios()

	items = Array.from(document.querySelectorAll('.items'))

	items.forEach(item => item.classList.remove('prev', 'active', 'next'))

	const prevItem = (currentItem - 1 + totalItems) % totalItems
	const nextItem = (currentItem + 1) % totalItems

	items[prevItem].classList.add('prev')
	items[currentItem].classList.add('active')
	items[nextItem].classList.add('next')

	await updateBackground()
	await delay(300)

	showBtns()
	await delay(300)
	isAnim = false
}

function updateBackground() {
	document.body.style.backgroundImage = `url("images/item${currentItem}.webp")`
}

function updateIconPlayer() {
	if (playing) {
		const icon = playBtn.querySelector("i")
		icon.classList.remove("bi-play-circle-fill")
		icon.classList.add("bi-pause-circle-fill")
	} else {
		const icon = playBtn.querySelector("i")
		icon.classList.remove("bi-pause-circle-fill")
		icon.classList.add("bi-play-circle-fill")
	}
}

function resetAudios() {
	playing = false

	audios.forEach(aud => {
		aud.pause()
		aud.currentTime = 0
	})

	updateIconPlayer()
}

function hideBtns() {
	divActions.style.opacity = 0
}

function showBtns() {
	divActions.style.opacity = 1
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
