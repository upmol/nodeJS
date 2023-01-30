#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const rl = require('readline');
let counter = 0;
let dataString;
let findString;

const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
let list = fs.readdirSync('./');


function choiceFile(list) {
    
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Choose a file to read',
            choices: list,
        },
    ])
        .then(({ fileName }) => {
            if (isFile(fileName)) {
                const fullPath = path.join(executionDir, fileName);
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else console.log(data);
                dataString = data;
            });

            } else {
               choiceFile(fs.readdirSync('./' + fileName + '/'));
            };
        }).then(inputString);
};


const inspectString = (str = dataString, subStr = findString, pos = 0) => {
    let position = str.indexOf(subStr, pos);
    if (position !== -1) {
        counter++;
        inspectString(str, subStr, ++position);
    } else {
        console.log('Matches found: ', counter);
    };
};

const inputString = () => {
    
    inquirer.prompt([
        {
            name: 'string',
            type: 'input',
            message: 'Input finding string',
        },
    ])
        .then(({ string }) => {
                inspectString(dataString, string);
            });
};

choiceFile(list);
