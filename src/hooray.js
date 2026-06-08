class Hooray {
	static #painting = new WeakSet();

	#pieces;
	#target;
	#options;

	constructor(target, options = {}) {
		this.#pieces = [];

		this.#target = target;

		this.#options = {
			count: 80,
			duration: 3500,
			width: 16,
			height: 8,
			spread: 380,
			mobileSpread: 120,
			once: true,
			...options,
		};

		this.#validate();
	}

	#validate() {
		if (this.#options.count > 1000)
			console.warn(
				"[hooray.js]:\nwarning: a high count is likely to impact performance.",
			);
	}

	paint() {
		if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true)
			return;
		if (Hooray.#painting.has(this.#target)) return;

		Hooray.#painting.add(this.#target);

		this.#whenViewportSettled(() => {
			const frag = new DocumentFragment();

			const spread =
				window.innerWidth < 800
					? this.#options.mobileSpread
					: this.#options.spread;

			const rect = this.#target.getBoundingClientRect();
			const origin = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			};

			for (let i = 0; i < this.#options.count; i++) {
				const piece = new Piece(this.#options, origin, spread);
				this.#pieces.push(piece);
				frag.append(piece.el);
			}
			document.body.append(frag);

			Promise.all(this.#pieces.map((p) => p.finished.catch(() => {}))).then(
				() => {
					Hooray.#painting.delete(this.#target);
					this.#cleanup();
				},
			);
		});
	}

	#whenViewportSettled(callback) {
		const vv = window.visualViewport;
		if (!vv) {
			requestAnimationFrame(callback);
			return;
		}

		let timer;
		const settle = () => {
			vv.removeEventListener("resize", onResize);
			callback();
		};
		const onResize = () => {
			clearTimeout(timer);
			timer = setTimeout(settle, 100);
		};

		vv.addEventListener("resize", onResize);

		timer = setTimeout(settle, 100);
	}

	#cleanup() {
		this.#pieces.forEach((piece) => {
			piece.el.remove();
		});
	}
}

class Piece {
	#el;
	#options;
	#origin;
	#spread;
	#animation;

	constructor(options, origin, spread) {
		this.#options = options;
		this.#origin = origin;
		this.#spread = spread;

		this.#el = document.createElement("span");
		this.#el.classList.add("hooray-piece");

		this.#applyBaseStyles();
		this.#applySize();
		this.#applyStyles();
		this.#applyPosition();
		this.#applyTrajectory();
	}

	get el() {
		return this.#el;
	}

	get finished() {
		return this.#animation.finished;
	}

	#applyBaseStyles() {
		this.#el.style.display = "block";
		this.#el.style.position = "fixed";

		if (this.#options.image) {
			if (this.#options.color) {
				this.#el.style.maskSize = "contain";
				this.#el.style.maskRepeat = "no-repeat";
				this.#el.style.maskPosition = "center";
				this.#el.style.webkitMaskSize = "contain";
				this.#el.style.webkitMaskRepeat = "no-repeat";
				this.#el.style.webkitMaskPosition = "center";
			} else {
				this.#el.style.backgroundSize = "contain";
				this.#el.style.backgroundRepeat = "no-repeat";
				this.#el.style.backgroundPosition = "center";
			}
		}
	}

	#applySize() {
		const wRand = Math.random();
		const hRand = this.#options.image ? wRand : Math.random();
		this.#el.style.width = `${wRand * this.#options.width}px`;
		this.#el.style.height = `${hRand * this.#options.height}px`;
	}

	#applyStyles() {
		if (!this.#options.image) {
			this.#el.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
			return;
		}

		if (this.#options.color) {
			this.#el.style.backgroundColor = this.#options.color;
			this.#el.style.maskImage = `url(${this.#options.image})`;
			this.#el.style.webkitMaskImage = `url(${this.#options.image})`;
		} else {
			this.#el.style.backgroundImage = `url(${this.#options.image})`;
		}
	}

	#applyPosition() {
		this.#el.style.left = `${this.#origin.x}px`;
		this.#el.style.top = `${this.#origin.y}px`;
	}

	#applyTrajectory() {
		const angle = Math.random() * Math.PI * 2;
		const cap = Math.random() * this.#spread;
		const burstX = Math.random() * Math.cos(angle) * cap;
		const burstY = Math.random() * Math.sin(angle) * cap;
		const rot = Math.floor(Math.random() * 360);

		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
		const distanceToBottom =
			viewportHeight - this.#origin.y + this.#options.height;
		const fallDistance = distanceToBottom * (1 + Math.random() * 0.4);

		this.#animation = this.#el.animate(
			[
				{
					transform: `translate(0, 0) rotate(${rot}deg)`,
					opacity: 1,
					easing: "ease-out",
					offset: 0,
				},
				{
					transform: `translate(${burstX}px, ${burstY}px) rotate(${rot + 120}deg)`,
					easing: "ease-in",
					offset: 0.15,
				},
				{
					transform: `translate(${burstX}px, ${fallDistance}px) rotate(${rot + 540}deg)`,
					opacity: 1,
					offset: 1,
				},
			],
			{
				duration: this.#options.duration,
				delay: Math.random() * 100,
				easing: "ease-out",
				fill: "both",
			},
		);
	}
}

export const hooray = (target, options = {}) => {
	const h = new Hooray(target, options);
	h.paint();
	return h;
};
