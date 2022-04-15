import inquirer = require('inquirer');
import { songMenu } from './song.menu';

export function run() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'What do you want to do?',
        choices: [
          'Artists',
          'Groups',
          'Songs',
          'Albums',
          'Playlists',
          new inquirer.Separator(),
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.index) {
        case 'Artists': {
          console.log('Artists');
          break;
        }
        case 'Groups': {
          console.log('Groups');
          break;
        }
        case 'Songs': {
          songMenu();
          break;
        }
        case 'Albums': {
          console.log('Albums');
          break;
        }
        case 'Playlists': {
          console.log('Playlists');
          break;
        }
        case 'Exit': {
          process.exit();
          break;
        }
        default: {
          break;
        }
      }
    });

  // inquirer
  //   .prompt([
  //     {
  //       type: 'confirm',
  //       name: 'exitConfirm',
  //       message: 'Continue?',
  //       default: true,
  //     },
  //   ])
  //   .then((ContinueAnswer) => {
  //     if (ContinueAnswer.exitConfirm) {
  //       run();
  //     } else {
  //       process.exit();
  //     }
  //   });
}

run();
