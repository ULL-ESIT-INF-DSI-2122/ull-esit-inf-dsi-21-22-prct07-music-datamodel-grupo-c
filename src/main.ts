import inquirer = require('inquirer');
import { genreMenu } from './genre.menu'; // eslint-disable-line
import { songMenu } from './song.menu'; // eslint-disable-line
import { playlistMenu } from './playlist.menu';
import { albumMenu } from './album.menu'; // eslint-disable-line
import { groupMenu } from './group.menu'; // eslint-disable-line
import { artistsMenu } from './artists.menu'; // eslint-disable-line

export function run() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'What do you want to do?',
        choices: [
          'Artists',
          'Genres',
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
          artistsMenu();
          break;
        }
        case 'Genres': {
          genreMenu();
          break;
        }
        case 'Groups': {
          groupMenu();
          break;
        }
        case 'Songs': {
          songMenu();
          break;
        }
        case 'Albums': {
          albumMenu();
          break;
        }
        case 'Playlists': {
          playlistMenu();
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
