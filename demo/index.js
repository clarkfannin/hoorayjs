import { hooray } from "../src/hooray.js";

const selectionMap = {
	confetti: null,
	stars: "./images/star.svg",
	hearts: "./images/heart.svg",
};
let selection;

let target = document.getElementById("hooray-form-submit");

const options = {
	count: 80,
	mobileCount: 40,
	duration: 3000,
	width: 16,
	height: 8,
	mobileWidth: 16,
	mobileHeight: 8,
	spread: 300,
	mobileSpread: 100,
	once: false,
};

const form = document.getElementById("hooray-form");
const btn = document.getElementById("hooray-form-submit");
const dropdown = document.getElementById("hooray-controls-dropdown");

const handleSubmit = (e) => {
	e.preventDefault();

	const image = selection ? selectionMap[selection] : null;
	if (image) {
		options.image = image;
		options.width = 24;
		options.height = 24;
		options.mobileWidth = 16;
		options.mobileHeight = 16;
	}
	hooray(target, options);
}
form.addEventListener("submit", handleSubmit);

dropdown.addEventListener("change", (e) => {
	selection = e.target.value;
});

window.targetCenter = () => {
	target = document.querySelector("main");
};

const mockPayment = () => {
	return new Promise((resolve) => {
		setTimeout(resolve, Math.random() * 5000);
	});
};

window.mockAsync = () => {
	form.removeEventListener("submit", handleSubmit);
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		btn.disabled = true;
		btn.innerHTML = `<span class="spinner"></span>`;

		await mockPayment();

		btn.disabled = false;
		btn.textContent = "submit";

		hooray(btn, options);
	});
};
