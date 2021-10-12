const electron = require('electron');
const {ipcRenderer} = electron;

let statsData = {}

ipcRenderer.on("stats", (event, data) => {
    statsData = data;
    console.log(statsData);  
});



const bar = document.querySelector('.bar');
const links = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('section');
const buttonList = document.querySelectorAll('.graph-btn');
const navCoords = document.querySelector('nav').getBoundingClientRect();
const startCoords = document.querySelector('#icon-video').getBoundingClientRect();
setBounds(startCoords);

let i = 0;
var chartInterval;
buttonList.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(chartInterval);
        const graphDiv = document.querySelector('.graph');
        graphDiv.removeChild(graphDiv.firstChild);
        const canvas = document.createElement('canvas');
        canvas.id = 'chartContainer';
        graphDiv.appendChild(canvas);
        let chart = addChart();
        i = 0;
        chartInterval = setInterval(updateChart, 1000, chart)
    });
});

function updateChart(chart) {
    if (i < 10) {
        chart.data.labels.push(i.toString());
        chart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
        i++;
        // console.log(i);
        chart.update();
    }

}
function addChart() {

    var ctx = document.querySelector('#chartContainer').getContext('2d');
    Chart.defaults.font.size = 10;
    Chart.defaults.plugins.title.display = false;
    Chart.defaults.plugins.legend.display = false;

    var gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, "rgba(2, 119, 250, 0.2)");
    gradientFill.addColorStop(0.5, "rgba(2, 119, 250, 0.1)");
    gradientFill.addColorStop(1, "rgba(2, 119, 250, 0)");

    var chart = new Chart(document.querySelector('#chartContainer'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                pointBackgroundColor: '#0277FA',
                borderColor: '#0277FA',
                data: [],
                tension: 0.5,
                fill: true,
                backgroundColor: gradientFill,
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 1
                }
            },
            scales: {
                y: {
                    min: 0,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    return chart;
}

let currentLevel = 50;
const innerCircle = document.querySelector('.inner-circle');
innerCircle.addEventListener('click', () => {
    const liquid = document.querySelector('.after');
    liquid.style.animation = "none";
    setTimeout(() => { liquid.style.animation = ""; }, 1)
    const a = Math.floor(Math.random() * 100);
    document.documentElement.style.setProperty('--initial-battery', `${currentLevel}%`);
    document.documentElement.style.setProperty('--battery-level', `${100 - a}%`);
    currentLevel = 100 - a;

    document.querySelector('.before').textContent = `${a}%`;
    document.querySelector('#level').textContent = `Remaining: ${a}%`;
});

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
        // document.querySelector('#icon-control').src = `../assets/icon_control.svg`;
        document.querySelector('#icon-video').src = `../assets/icon_video.svg`;
        document.querySelector('#icon-stats').src = `../assets/icon_stats.svg`;
        const activeAnchor = document.querySelector(`#icon-${link.hash.substring(1,)}`);
        activeAnchor.src = `../assets/icon_${link.hash.substring(1,)}_focused.svg`;
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
            // document.querySelector('#icon-control').src = `../assets/icon_control.svg`;
            document.querySelector('#icon-video').src = `../assets/icon_video.svg`;
            document.querySelector('#icon-stats').src = `../assets/icon_stats.svg`;
            activeAnchor.src = `../assets/icon_${className}_focused.svg`;
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