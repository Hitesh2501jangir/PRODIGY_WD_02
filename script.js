const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');
const milliSecondInput = document.getElementById('millisecond');
const lapBtn = document.getElementById('lap-button');
const resetBtn = document.getElementById('reset-button');
const startBtn = document.getElementById('stop-button');
const dataContainer = document.getElementById('data_box');
const lapDataContainer = document.getElementById('lap-data-box')
const lapTotalTimeHour = document.getElementById('tt-hr');
const lapTotalTimeMinute = document.getElementById('tt-min');
const lapTotalTimeSecond = document.getElementById('tt-sec');
const lapTotalTimeMillisecond = document.getElementById('tt-msec');

// Declaration and initililize the value of (H:M:S:ms)
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
var startButton;
let lapBoxCheck = false;
let lapNumber = 1;


// TimerFunction which can update the value on the screen
const startTimer = ()=>{
   millisecond++;
   if(millisecond == 100){
      second++;
      millisecond = 0;
   }if(second==60){
      minute++;
      second = 0;
   }if(minute==60){
      hour++;
      minute = 0;
   }

   // // set the value (0 --> 00) on the screen // //
   let milliSec = millisecond
   let sec = second;
   let min = minute;
   if(milliSec < 10){
      milliSec = "0"+milliSec;
   }if(sec < 10){
      sec = "0"+sec;
   }if(min < 10){
      min = "0"+min;
   }

   // // Insert value // //
   hourInput.innerText = hour;
   minuteInput.innerText = min;
   secondInput.innerText = sec;
   milliSecondInput.innerText = milliSec;

   // // Insert Value for lap total timer // //
   if(lapBoxCheck){
      lapTotalTimeHour.innerText = `0${hour}`;
      lapTotalTimeMinute.innerText = min;
      lapTotalTimeSecond.innerText = sec;
      lapTotalTimeMillisecond.innerText = milliSec;
   }
}

// start & stop buttonn event
startBtn.addEventListener('click',()=>{
   if(startBtn.innerText == "START"){
    startBtn.innerText = "STOP";
    lapBtn.classList.remove('disabled');
    resetBtn.classList.remove('disabled');
    startButton = setInterval(()=>{
      startTimer();
    },10);
   }else{
      clearInterval(startButton);
      clearInterval(lapTimeInterval);
      startBtn.innerText = "START";
      lapBtn.classList.add('disabled');
   }
})


// reset button event
resetBtn.addEventListener('click',()=>{
   // clearInterval(startButton);
   // hourInput.innerText = 0;
   // minuteInput.innerText = "00";
   // secondInput.innerText = "00";
   // milliSecondInput.innerText = "00";
   // startBtn.innerText = "START";
   // lapBtn.classList.add('disabled');
   // resetBtn.classList.add('disabled');
   location.reload();
})



//lap section code
/*In the below code a timer is setup for the lap section.
Code is complecated  but this is my learning phase I can implement it.
*/


// Declaration of the required lap data values
const lapTimeHr = document.getElementById('t-hr');
const lapTimeMin = document.getElementById('t-min');
const lapTimeSec = document.getElementById('t-sec');
const lapTimeMsec = document.getElementById('t-msec');
const lapNoOfConstBox = document.querySelector('.const_Lap_box')
const lapTotalTime = document.querySelector('.lap_total_time');
const lapTime = document.querySelector('.lap_time');

// initilize the value
let lapTimeHour = 0;
let lapTimeMinute = 0;
let lapTimeSecond = 0;
let lapTimeMilliSecond = 0;
let lapTimeInterval;

// Timer for lap box
const startLapTimer = ()=>{
   lapTimeMilliSecond++;
   if(lapTimeMilliSecond == 100){
      lapTimeSecond++;
      lapTimeMilliSecond = 0;
   }if(lapTimeSecond == 60){
      lapTimeMinute++;
      lapTimeSecond = 0;
   }if(lapTimeMinute == 60){
      lapTimeHour++;
      lapTimeMinute = 0;
   }
   let milliSec = lapTimeMilliSecond;
   let sec = lapTimeSecond;
   let min = lapTimeMinute;
   if(milliSec < 10){
      milliSec = "0"+milliSec;
   }if(sec < 10){
      sec = "0"+sec;
   }if(min < 10){
      min = "0"+min;
   }
   lapTimeHr.innerText = `0${lapTimeHour}`;
   lapTimeMin.innerText = min;
   lapTimeSec.innerText = sec;
   lapTimeMsec.innerText = milliSec;
}



// print the onclick lap time
const printLapValue = ()=>{
   const getDivRow = document.createElement('div');
   getDivRow.classList.add('New_lap_div');
   let milliSec = millisecond;
   let sec = second;
   let min = minute;
   let lapmillisec = lapTimeMilliSecond;
   let lapsec = lapTimeSecond;
   let lapmin = lapTimeMinute;
   if(milliSec < 10){
      milliSec = "0"+milliSec;
   }if(sec < 10){
      sec = "0"+sec;
   }if(min < 10){
      min = "0"+min;
   }if(lapmillisec < 10){
      lapmillisec = "0"+lapmillisec;
   }if(lapsec < 10){
      lapsec = "0"+lapsec;
   }if(lapmin < 10){
      lapmin = '0'+lapmin;
   }

   if(lapNumber == 1){
      getDivRow.innerHTML = `
      <p class="New_lap_num">${lapNumber}</p>
         <p class="New_lap_time">0${hour}:${min}:${sec}:<span>${milliSec}</span> </p>
         <p class="New_lap_total_time">0${hour}:${min}:${sec}:<span>${milliSec}</span> </p>
      `;
      lapNumber++;
   }else{
      getDivRow.innerHTML = `
         <p class="New_lap_num">${lapNumber}</p>
         <p class="New_lap_time">0${lapTimeHour}:${lapmin}:${lapsec}:<span>${lapmillisec}</span> </p>
         <p class="New_lap_total_time">0${hour}:${min}:${sec}:<span>${milliSec}</span> </p>
      `;
      lapNumber++;
   }
   lapDataContainer.append(getDivRow);
}

// Lap button event
lapBtn.addEventListener('click',()=>{
   lapNoOfConstBox.innerText = lapNumber+1;
   if(lapNumber == 1){
      dataContainer.style.display = 'block';
      lapBoxCheck = true;
      printLapValue();
      lapTimeInterval = setInterval(()=>{
         startLapTimer();
      },10);
   }else{
      printLapValue();
      clearInterval(lapTimeInterval);
      lapTimeHour = 0;
      lapTimeMinute = 0;
      lapTimeSecond = 0;
      lapTimeMilliSecond = 0;
      lapTimeInterval = setInterval(()=>{
         startLapTimer();
      },10); 
   }
})
/** END */