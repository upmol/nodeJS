const inquirer = require('inquirer');

const inputString = () => {
    
    inquirer.prompt([
        {
            name: 'string',
            type: 'input', // input, number, confirm, list, checkbox, password
            message: 'Input finding string',
            // choices: list,
        },
    ])
        .then(({ string }) => {
                // inspectString(data, string);
                console.log(string);
            });
};

inputString();