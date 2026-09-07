let sec = 25*60;
let timeinterval =  null;
let isrunning = false;
console.log("JS loaded");
function updatedisplay(){
    const minutes = Math.floor(sec/60);
    const seconds = sec%60;
    document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

}
function starttimer(){
    if(!isrunning){
        isrunning = true;
        timeinterval = setInterval(function(){
            sec--;
            updatedisplay();
            if(sec <= 0){
                clearInterval(timeinterval);
                isrunning = false;
                sec = 25*60;
                updatedisplay();
            }
        }, 1000);
    }
}
function pausetimer(){
    if(isrunning){
        clearInterval(timeinterval);
        isrunning = false;
    }
}
console.log("JS loaded");
starttimer();


