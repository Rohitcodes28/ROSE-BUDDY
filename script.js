const updateCountdown = () => {
    // Release is exactly 2 weeks from now
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 14);

    function refresh() {
        const now = new Date().getTime();
        const diff = releaseDate - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
    }

    setInterval(refresh, 1000);
    refresh();
};

updateCountdown();