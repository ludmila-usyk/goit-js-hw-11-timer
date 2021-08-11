const refs = {
  dateValue: document.querySelector('[data-value="days"]'),
  hoursValue: document.querySelector('[data-value="hours"]'),
  minsValue: document.querySelector('[data-value="mins"]'),
  secsValue: document.querySelector('[data-value="secs"]'),
}
  
  class countdownTimer {
    constructor({ targetDate, onTick }) {
      this.intervalId = null;
      this.targetDate = targetDate;
      this.onTick = onTick;
    }
  
    start() {
      const startTime = this.targetDate;
  
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const time = this.getTimeComponents(deltaTime);
   
        this.onTick(time);

        if (time.days < 0) {
          clearInterval(this.intervalId);
          const time = this.getTimeComponents(0);
          this.onTick(time);
        }
      }, 1000);
    }
  
    getTimeComponents(time) {
      const days = this.pad(Math.floor((time / (1000 * 60 * 60 * 24))));
      const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),);
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
      return { days, hours, mins, secs };
    }
  
    pad(value) {
      return String(value).padStart(2, '0');
    }
  }
  
  const timer = new countdownTimer({
    targetDate: new Date('Dec 31, 2021'),
    onTick: updateClockface,
  });
  
  function updateClockface({ days, hours, mins, secs }) {
    refs.dateValue.textContent = days;
    refs.hoursValue.textContent = hours;
    refs.minsValue.textContent = mins;
    refs.secsValue.textContent = secs;
  }

  timer.start();