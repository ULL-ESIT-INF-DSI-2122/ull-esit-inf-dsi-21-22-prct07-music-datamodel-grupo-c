import inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Type your username',
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
