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
    port.innerText = "_____";
});

const set = document.querySelector('#set');
set.addEventListener('click', () => {
    document.querySelector('.prompt').classList.remove('dis');
    document.querySelector('.control').classList.add('hide');
});

const start = document.querySelector('#start');
start.addEventListener('click', () => {
    console.log(parseInt(speedVal.innerHTML));
    console.log(parseInt(sensitivityVal.innerHTML));
    console.log(parseInt(turnVal.innerHTML));
    console.log(parseInt(port.innerHTML));
})

const closeBtn = document.querySelector('#close');
closeBtn.addEventListener('click', () => {
    document.querySelector('.prompt').classList.add('dis');
    document.querySelector('.control').classList.remove('hide');
    portVal = document.querySelector('#portNum').value;
    if (portVal === "") {
        port.innerText = "_____";
    }
    else {
        port.innerText = portVal;
    }
    document.querySelector('#portNum').value = "";
});