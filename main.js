var display=document.querySelector('.in-circle');
var laaps=document.querySelector('.laps');
const lapbtn = document.querySelector('.lapsbtn');
const bg = document.querySelector('.out-circle');
const lapreset = document.querySelector('#clear');
let hours = 0;
let minutes = 0;
let seconds = 0;
let millisec = 0;
let timer=null
let starttime=0
let elapsedtime=0
let isrun=false
let lapcount=0

function start()
{
    if(!isrun)
   {
    document.getElementById("play").classList.add("pause");
    document.getElementById("play").classList.add("animation-bg");
    bg.classList.add("animation-bg");
    starttime = Date.now()-elapsedtime;
    timer=setInterval(update,10);
    isrun=true;
   }
else
{
    document.getElementById("play").classList.remove("pause");
    document.getElementById("play").classList.remove("animation-bg");
    bg.classList.remove("animation-bg");
    clearInterval(timer);
    elapsedtime=Date.now()-starttime;
    isrun=false;
}
}

function reset()
{
    document.getElementById("play").classList.remove("pause");
    document.getElementById("play").classList.remove("animation-bg");
    bg.classList.remove("animation-bg");
    clearInterval(timer);
    starttime=0;
    elapsedtime=0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    millisec = 0;
    isrun=false;
    display.textContent="00 : 00 : 00 : 00";
}

function update()
{
    const currenttime=Date.now();
    elapsedtime=currenttime-starttime;

    hours = Math.floor(elapsedtime/(1000*60*60));
    minutes = Math.floor(elapsedtime/(1000*60)%60);
    seconds = Math.floor(elapsedtime/1000 % 60);
    millisec = Math.floor(elapsedtime % 1000/10);

    hours = String(hours).padStart(2 , "0");
    minutes = String(minutes).padStart(2 , "0");
    seconds = String(seconds).padStart(2 , "0");
    millisec = String(millisec).padStart(2 , "0");

    display.textContent = `${hours} : ${minutes} : ${seconds} : ${millisec} `;
}

//
const laap = () =>{
laaps.classList.remove("off");
const li = document.createElement("li");
const number = document.createElement("span");
const timestamp = document.createElement("span");

li.setAttribute("class" ,"lap-item");
number.setAttribute("class" ,"count");
timestamp.setAttribute("class" ,"time");

number.innerText =`#${++lapcount}`; 
timestamp.innerHTML = `${hours} : ${minutes} : ${seconds} : ${millisec} `;
li.appendChild(number);
li.appendChild(timestamp);
laaps.appendChild(li);
lapreset.classList.remove("hidden");
}

const lapclear = () =>
{
    lapcount=0;
    laaps.classList.add("off");
    laaps.innerHTML = '';
    lapreset.classList.add("hidden");
}

lapbtn.addEventListener("click",laap);
lapreset.addEventListener("click",lapclear);