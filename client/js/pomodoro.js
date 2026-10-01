document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;
});


/* ---------- TIMER STATE ---------- */

let sec = 25 * 60;
let timeinterval = null;
let isrunning = false;

let session = 1;
let phase = "focus";


/* ---------- ELEMENTS ---------- */

const startbtn = document.getElementById('play');
const skip = document.getElementById('skip');
const reset = document.getElementById('reset');

const dot1 = document.getElementById('dt1');
const dot2 = document.getElementById('dt2');
const dot3 = document.getElementById('dt3');
const dot4 = document.getElementById('dt4');

const sessiontext = document.getElementById('sessiontext');


/* ---------- DISPLAY ---------- */

function updatedisplay() {

    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    document.getElementById('minutes').innerHTML =
        minutes < 10 ? '0' + minutes : minutes;

    document.getElementById('seconds').innerHTML =
        seconds < 10 ? '0' + seconds : seconds;
}


/* ---------- SESSION UI ---------- */

function updatesessiontext() {

    if (phase === "focus") {

        sessiontext.innerHTML =
            "Session " + session + " of 4 · next: short break";

    } else {

        if (session === 4) {

            sessiontext.innerHTML =
                "Session 4 complete · long break";

        } else {

            sessiontext.innerHTML =
                "Session " + session + " complete · short break";
        }
    }
}


/* ---------- COMPLETE SESSION ---------- */

function completesession() {

    if (session === 1) {

        dot1.classList.add('on');

    } else if (session === 2) {

        dot2.classList.add('on');

    } else if (session === 3) {

        dot3.classList.add('on');

    } else if (session === 4) {

        dot4.classList.add('on');
    }
}


/* ---------- START TIMER ---------- */

function starttimer() {

    if (!isrunning) {

        isrunning = true;

        timeinterval = setInterval(function () {

            sec--;
            updatedisplay();


            /* FOCUS FINISHED */

            if (sec <= 0 && phase === "focus") {

                clearInterval(timeinterval);
                isrunning = false;

                completesession();

                phase = "break";

                if (session === 4) {

                    sec = 15 * 60;

                } else {

                    sec = 5 * 60;
                }

                updatesessiontext();
                updatedisplay();

                startbtn.innerHTML = '▶';
            }


            /* BREAK FINISHED */

            else if (sec <= 0 && phase === "break") {

                clearInterval(timeinterval);
                isrunning = false;

                /*
                 * Session 4 long break finished.
                 * Start a completely new cycle.
                 */

                if (session === 4) {

                    session = 1;

                    dot1.classList.remove('on');
                    dot2.classList.remove('on');
                    dot3.classList.remove('on');
                    dot4.classList.remove('on');

                } else {

                    session++;
                }

                phase = "focus";
                sec = 25 * 60;

                updatesessiontext();
                updatedisplay();

                startbtn.innerHTML = '▶';
            }

        }, 1000);
    }
}


/* ---------- PAUSE TIMER ---------- */

function pausetimer() {

    if (isrunning) {

        clearInterval(timeinterval);
        isrunning = false;
    }
}


/* ---------- PLAY / PAUSE BUTTON ---------- */

startbtn.addEventListener('click', toggletimer);

function toggletimer() {

    if (isrunning) {

        pausetimer();

        startbtn.innerHTML = '▶';

    } else {

        starttimer();

        startbtn.innerHTML = '⏸';
    }
}


/* ---------- SKIP ---------- */

skip.addEventListener('click', skipsession);

function skipsession() {

    clearInterval(timeinterval);
    isrunning = false;

if (phase === "focus") {

        completesession();
        phase = "break";
        if (session === 4) {
            sec = 15 * 60;
        } else {
            sec = 5 * 60;
        }
        updatesessiontext();
    }
    else if (phase === "break") {
        if (session === 4) {
            session = 1;

            dot1.classList.remove('on');
            dot2.classList.remove('on');
            dot3.classList.remove('on');
            dot4.classList.remove('on');
        } else {
            session++;
        }
        phase = "focus";
        sec = 25 * 60;
        updatesessiontext();
        }
    startbtn.innerHTML = '▶';
    updatedisplay();
}
/* ---------- RESET ---------- */
reset.addEventListener('click', resetsession);

function resetsession() {

    clearInterval(timeinterval);

    isrunning = false;

    sec = 25 * 60;
    session = 1;
    phase = "focus";

    dot1.classList.remove('on');
    dot2.classList.remove('on');
    dot3.classList.remove('on');
    dot4.classList.remove('on');

    startbtn.innerHTML = '▶';

    updatesessiontext();
    updatedisplay();
}


updatedisplay();
updatesessiontext();