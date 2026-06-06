const confetti = () => {
    for (let i=0; i < 100; i++) {
        const el = document.createElement("span");
        const grey = Math.floor(Math.random() * 256);
        el.style.background = `rgb(${grey}, ${grey}, ${grey})`
        el.style.left = `${Math.random() * window.innerWidth}px`
        el.style.top = `-${window.innerHeight}px`;
        el.style.transform = `rotate(${Math.floor(Math.random() * 365)}deg)`
        el.style.setProperty(`--offset`, Math.random() * window.innerWidth / 4)
        document.body.append(el);
    }

    
}

confetti()