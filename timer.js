const EventEmitter = require('events');
const emitter = new EventEmitter();
const dates = process.argv.slice(2);
const delay = 1000;

class Timer {
    constructor(date) {
        this.date = date;
        this.name = 'timer';
    }
}

const getDate = (input) => {
    let array = input.split('-');
    array = array.reverse();
    array = array.map(function(item) {return Number(item)});
    let date = new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
    return date;
}

const getRemainedTime = (inputDate) => {
    let now = new Date();
    console.log(inputDate - now);
    return inputDate - now;
};

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min );
  };

const createTimer = (date, id) => {
    return new Timer(date, id);
};
  
const run = async () => {
    dates.forEach(function(arg, i) {
        date = getDate(arg);
        remained = new Date(getRemainedTime(date));
        emitter.emit(remained);
    });
    emitter.emit('timer');
    await new Promise(resolve => setTimeout(resolve, delay));
    await run();
  }

  class Handlers {
    static timer(date) {
        console.log('Handlers');
        console.clear();
        console.log('Timer:', date);
    }
}

dates.forEach(function(arg, i) {
    createTimer(arg, i);
    emitter.on(i, Handlers.timer);
});

  run();