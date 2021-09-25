const bar = document.querySelector('.bar');
const links = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('section');
const navCoords = document.querySelector('nav').getBoundingClientRect();
const startCoords = document.querySelector('#icon-video').getBoundingClientRect();
setBounds(startCoords);

function setBounds(coords) {
    bar.style.top = `${coords.y}px`;
    bar.style.height = `${coords.height}px`;
    bar.style.left = `${navCoords.width - 4}px`;
}

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(`${link.hash}`).scrollIntoView({
            behavior: "smooth"
        });
        document.querySelector('#icon-video').src = `icon_video.svg`;
        document.querySelector('#icon-stats').src = `icon_stats.svg`;
        const activeAnchor = document.querySelector(`#icon-${link.hash.substring(1,)}`);
        activeAnchor.src = `icon_${link.hash.substring(1,)}_focused.svg`;
        const coords = activeAnchor.getBoundingClientRect();
        setBounds(coords);
    });
});
const options = {
    threshold: 0.7
};
let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
    entries.forEach(entry => {
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`#icon-${className}`);
        const coords = activeAnchor.getBoundingClientRect();

        if (entry.isIntersecting) {
            setBounds(coords);
            document.querySelector('#icon-video').src = `icon_video.svg`;
            document.querySelector('#icon-stats').src = `icon_stats.svg`;
            activeAnchor.src = `icon_${className}_focused.svg`;
        }
    });
}
sections.forEach(section => {
    observer.observe(section)
});

window.addEventListener('keydown', (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
        // to prevent scrolling through arrow keys
    }
}, false);