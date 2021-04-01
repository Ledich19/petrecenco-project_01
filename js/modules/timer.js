function timer() {
       //Timer

       const dadline = new Date('2021-04-17');

       function getTimeRemaining(endtime) {
           const t = endtime - new Date(),
               days = t / (1000 * 60 * 60 * 24),
               hours = (t / (1000 * 60 * 60)) % 24,
               minutes = (t / (1000 * 60)) % 60,
               seconds = (t / (1000)) % 60;
   
           return {
               total: Math.floor(t),
               days: Math.floor(days),
               hours: Math.floor(hours),
               minutes: Math.floor(minutes),
               seconds: Math.floor(seconds)
           };
       }
   
       function getZero(num) {
           if (num >= 0 && num < 10) {
               return (`0${num}`);
           } else {
               return (num);
           }
       }
   
       function setClock() {
           const days = document.querySelector('#days'),
               hours = document.querySelector('#hours'),
               minutes = document.querySelector('#minutes'),
               seconds = document.querySelector('#seconds'),
               timeInterval = setInterval(updateClock, 1000);
           updateClock();
   
           function updateClock() {
               const newTime = getTimeRemaining(dadline);
   
               if (newTime.t <= 0) {
                   clearInterval(timeInterval);
               } else {
                   days.innerHTML = getZero(newTime.days);
                   hours.innerHTML = getZero(newTime.hours);
                   minutes.innerHTML = getZero(newTime.minutes);
                   seconds.innerHTML = getZero(newTime.seconds);
               }
           }
       }
       setClock();
}

export default  timer;