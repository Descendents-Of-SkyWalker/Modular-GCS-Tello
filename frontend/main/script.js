const bar = document.querySelector('.bar');
const links = document.querySelectorAll('a[href^="#"]');
const sections=document.querySelectorAll('section');

links.forEach(link =>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector(`${link.hash}`).scrollIntoView({
            behavior:"smooth"
        });
        document.querySelector('#icon-video').src=`icon_video.svg`;
        document.querySelector('#icon-stats').src=`icon_stats.svg`;
        document.querySelector(`#icon-${link.hash.substring(1,)}`).src=`icon_${link.hash.substring(1,)}_focused.svg`;
    });
});
const options = {
    threshold: 0.7
};
let observer = new IntersectionObserver(navCheck,options);

function navCheck(entries){
    entries.forEach(entry =>{
        const className=entry.target.className;
        const activeAnchor=document.querySelector(`#icon-${className}`);
        const coords=activeAnchor.getBoundingClientRect();

        if(entry.isIntersecting){
            bar.style.left=`${coords.left+63}px`;
            bar.style.top=`${coords.top-165}px`;
            bar.style.width=`3px`;
            bar.style.height=`70px`;
            document.querySelector('#icon-video').src=`icon_video.svg`;
            document.querySelector('#icon-stats').src=`icon_stats.svg`;
            activeAnchor.src=`icon_${className}_focused.svg`;
        }
    });
}
sections.forEach(section =>{
    observer.observe(section)
});

let keyStopper=false;

window.addEventListener('keydown', (e)=>{
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
        // to prevent scrolling through arrow keys
    }
    if(keyStopper){
        setTimeout(function(){
            console.log("Long Press "+e.code);
        },1000);
    }
    else{
        keyStopper=true;
        console.log(e.code);
    }
    
}, false);

window.addEventListener('keyup',(e)=>{
    keyStopper=false;
})

/* 0.25 keydown */
/* keypress */