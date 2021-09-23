const electron = require("electron");
const { ipcRenderer } = electron;

let img = document.querySelector("img");
ipcRenderer.on("frame", (event, data) => {
  img.src = `data:image/jpg;base64,${data}`;
});


class KeyEventLogger{
    constructor(key){
        this.key = key;
        window.addEventListener("keydown", (e) => this.fireFunctionProperty(e));
    }
    fireFunctionProperty(e){
        if(e.key == this.key){
            if(!e.repeat){
                console.log(e.key);
                this.startTime = Date.now();
            }
            else{
                if((Date.now() - this.startTime) >= 500){
                    console.log(e.key);
                    this.startTime = Date.now();
                }
            }
        }
    }
}


new KeyEventLogger('a');
new KeyEventLogger('s');
new KeyEventLogger('w');
new KeyEventLogger('d');
new KeyEventLogger('ArrowRight');
new KeyEventLogger('ArrowLeft');
new KeyEventLogger('ArrowUp');
new KeyEventLogger('ArrowDown');
new KeyEventLogger('Escape');
new KeyEventLogger(' ');
