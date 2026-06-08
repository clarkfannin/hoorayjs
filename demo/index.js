import { hooray } from "../src/hooray.js";

document.getElementById("hooray-form").addEventListener("submit", (e) => {
	e.preventDefault();
	hooray(document.getElementById("hooray-form-submit"), {
		count: 80,
		duration: 3000,
		width: 16,
		height: 8,
		spread: 380,
		mobileSpread: 120,
	});
});

