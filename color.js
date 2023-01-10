const colors = require('colors');
const [from, to] = process.argv.slice(2);
const listOfColors = ['green', 'yellow', 'red'];
let count = 0;

function output(n) {
    console.log(colors[listOfColors[count % 3]](n));
}

function validation() {
    numFrom = Number(from);
    numTo = Number(to);
    if (!(Number.isInteger(numFrom) && Number.isInteger(numTo))) {
        console.log(colors.red("Enter integer number"));
        return; 
    };
    if (numTo < 3) {
        console.log(colors.red("Enter number more"));
        return;
    };
    if (numFrom > numTo) {
        console.log(colors.red("Second number must be more"));
        return;
    };
    if (numFrom < 2) numFrom = 2;
    engine(numFrom, numTo);
};
 

function engine(from, to) {
    for (let i = from; i <= to; i++) {
        if (i == 2) {
            output(i);
            count++;
        };
        for (let j = i-1; j > 1; j--) {
            if (i % j == 0) {
                j = 0;
            };
            if (j == 2) {
                output(i);
                count++;
            };
        };
    };
;}

validation();


