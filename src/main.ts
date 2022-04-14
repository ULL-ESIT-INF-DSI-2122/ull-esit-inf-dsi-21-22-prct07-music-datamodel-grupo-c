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
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'sortMethod',
            message: 'Choose a sorting method',
            choices: [
              'Sort by song title',
              'Sort by artist/group name',
              'Sort by year',
              'Sort by song duration',
              'Sort by genre',
              'Sort by number of views',
            ],
          },
        ])
        .then((sortAnswers) => {
          if (sortAnswers.sortMethod === 'Sort by song title') {
            inquirer.prompt([
              {
                type: 'list',
                name: 'ascDesc',
                message: 'Ascending or Descending order?',
                choices: [
                  'Ascending',
                  'Descending',
                ],
              },
            ])
              .then((ascDescAnswer) => {
                console.log(ascDescAnswer);
              });
          }
        });
    }

    if (answers.userChoice === 'Create a new playlist') {
      console.log('*Create a new Playlist*');
    }

    if (answers.userChoice === 'Delete a playlist') {
      console.log('*Delete a playlist*');
    }
  });
