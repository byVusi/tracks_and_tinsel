if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("./sw.js")
		.then(() => console.log("✅ Service Worker registered"))
		.catch((err) => console.error("❌ Service Worker failed:", err));
}

const DATE_OF_DEPARTURE = "2025-12-24T10:33:10";

const headerElement = document.querySelector("header");
const mainElement = document.querySelector("main");
const timerElement = document.querySelector(".timer");

const daysDigits = document.querySelector("#days");
const hoursDigits = document.querySelector("#hours");
const minutesDigits = document.querySelector("#minutes");
const secondsDigits = document.querySelector("#seconds");

function startCountdown(targetDate) {
	const end = new Date(targetDate);
	let timerID;

	function update() {
		const now = new Date();
		const diff = end - now; // milliseconds

		if (diff <= 0) {
			document.querySelector("h1").textContent = "Tracks & Tinsel";
			timerElement.replaceChildren();

			if (mainElement.querySelector("h2"))
				mainElement.querySelector("h2").remove();
			const message = document.createElement("h2");
			message.textContent = "Countdown complete!";

			mainElement.prepend(message);
			timerElement.append(timesUp());

			clearInterval(timerID);
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		// Change in UI
		daysDigits.textContent = days;
		hoursDigits.textContent = hours >= 10 ? hours : `0${hours}`;
		minutesDigits.textContent = minutes >= 10 ? minutes : `0${minutes}`;
		secondsDigits.textContent = seconds >= 10 ? seconds : `0${seconds}`;
	}

	update(); // call immediately
	timerID = setInterval(update, 1000);
}

function timesUp() {
	const element = document.createElement("div");
	element.classList.add("complete-message");
	element.textContent = "🎄";

	return element;
}

startCountdown(DATE_OF_DEPARTURE);
