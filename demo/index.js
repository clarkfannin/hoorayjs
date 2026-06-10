import { hooray } from "../src/hooray.js";

const selectionMap = {
	confetti: null,
	stars: "./images/star.svg",
	hearts: "./images/heart.svg",
};
let selection;

document.getElementById("hooray-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const options = {
		count: 80,
		mobileCount: 40,
		duration: 3000,
		width: 16,
		height: 8,
		mobileWidth: 16,
		mobileHeight: 8,
		spread: 380,
		mobileSpread: 150,
		once: true,
	};

	const image = selection ? selectionMap[selection] : null;
	if (image) {
		options.image = image;
		options.width = 24;
		options.height = 24;
		options.mobileWidth = 16;
		options.mobileHeight = 16;
	}
	hooray(document.getElementById("hooray-form-submit"), options);
});

document
	.getElementById("hooray-controls-dropdown")
	.addEventListener("change", (e) => {
		selection = e.target.value;
	});