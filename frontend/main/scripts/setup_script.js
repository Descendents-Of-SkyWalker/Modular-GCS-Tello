const speedVal = document.querySelector('#set-speed');
const sensitivityVal = document.querySelector('#sensitivity-value');
const turnVal = document.querySelector('#turn-value');
const port = document.querySelector('#portVal');

let portVal = ""

const speedSlider = document.querySelector('#speed-range');
speedSlider.addEventListener('input', () => {
    speedVal.innerHTML = speedSlider.value;
});
const sensitivitySlider = document.querySelector('#sensitivity-range');
sensitivitySlider.addEventListener('input', () => {
    sensitivityVal.innerHTML = sensitivitySlider.value;
});
const turnSlider = document.querySelector('#turn-range');
turnSlider.addEventListener('input', () => {
    turnVal.innerHTML = turnSlider.value;
});

const deflt = document.querySelector('#default');
deflt.addEventListener('click', () => {
    speedSlider.value = 20;
    sensitivitySlider.value = 2;
    turnSlider.value = 2;
    speedVal.innerHTML = 20;
    sensitivityVal.innerHTML = 2;
    turnVal.innerHTML = 2;
    port.innerText = "15000";
});

const set = document.querySelector('#set');
set.addEventListener('click', () => {
    document.querySelector('.prompt').classList.remove('dis');
    document.querySelector('.control').classList.add('hide');
});

const start = document.querySelector('#start');
start.addEventListener('click', () => {
    const setupObject = {};
    setupObject.speed = parseInt(speedVal.innerHTML);
    setupObject.movementSensitivity = parseInt(sensitivityVal.innerHTML);
    setupObject.turnSensitivity = parseInt(turnVal.innerHTML);
    setupObject.port = parseInt(port.innerHTML);

    console.log(setupObject);
})

const closeBtn = document.querySelector('#close');
closeBtn.addEventListener('click', () => {
    document.querySelector('.prompt').classList.add('dis');
    document.querySelector('.control').classList.remove('hide');
    portVal = document.querySelector('#portNum').value;
    if (portVal === "") {
        port.innerText = "15000";
    }
    else {
        port.innerText = portVal;
    }
    document.querySelector('#portNum').value = "";
});