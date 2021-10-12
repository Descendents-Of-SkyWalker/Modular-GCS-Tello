let img = document.querySelector("#video > img");
ipcRenderer.on("frame", (event, data) => {
  img.src = `data:image/jpg;base64,${data}`;
});



class KeyEventLogger{
    constructor(key, value){
        this.key = key;
        this.value = value;
        window.addEventListener("keydown", (e) => this.fireFunctionProperty(e));
    }
    fireFunctionProperty(e){
        if(e.key == this.key){
            if(!e.repeat){
                console.log(e.key);
                ipcRenderer.send("keyboard:event", this.value + '');
                this.startTime = Date.now();
            }
            else{
                if((Date.now() - this.startTime) >= 1000){
                    ipcRenderer.send("keyboard:event", this.value + '');
                    console.log(e.key);
                    this.startTime = Date.now();
                }
            }
        }
    }
}


new KeyEventLogger('a', 3);
new KeyEventLogger('s', 5);
new KeyEventLogger('w', 2);
new KeyEventLogger('d', 4);
new KeyEventLogger('ArrowRight', 8);
new KeyEventLogger('ArrowLeft', 9);
new KeyEventLogger('ArrowUp', 6);
new KeyEventLogger('ArrowDown', 7);
new KeyEventLogger('Escape', "#");
new KeyEventLogger(' ', 1);
