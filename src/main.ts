import inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?',
      validate(answer) {
        if (!answer) {
          return 'Please, fill your name!';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'userChoice',
      message: 'What do you want to do?',
      choices: [
        'List all playlists',
        'Search a playlist',
        'Create a new playlist',
        'Delete a playlist',
      ],
    },
  ])
  .then((answers) => {
    if (answers.userChoice === 'List all playlists') {
      console.log('*All Playlist*');
    }

    if (answers.userChoice === 'Search a playlist') {
      console.log('*Search a playlist and sort*');
    }

    if (answers.userChoice === 'Create a new playlist') {
      console.log('*Create a new Playlist*');
    }

    if (answers.userChoice === 'Delete a playlist') {
      console.log('*Delete a playlist*');
    }
  });
