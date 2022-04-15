import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { run } from './main'; // eslint-disable-line
import PlaylistManager from './playlitsManager.class';
import { PlaylistInterface } from './database.interfaces';

const playlistManager: PlaylistManager = new PlaylistManager();

export function playlistMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'playlistMenu',
        message: 'Choose an action:',
        choices: [
          'List all playlists',
          'Search playlist',
          'Create playlist',
          'Save playlist',
          'Delete playlist',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.playlistMenu) {
        case 'List all playlists': {
          console.log(playlistManager.preview());
          playlistMenu();
          break;
        }
        case 'Search playlist': {
          playlistMenu();
          break;
        }
        case 'Create playlist': {
          playlistMenu();
          break;
        }
        case 'Save playlist': {
          playlistMenu();
          break;
        }
        case 'Delete playlist': {
          playlistMenu();
          break;
        }
        case 'Go Back': {
          console.clear();
          run();
          break;
        }
        default: {
          break;
        }
      }
    });
}
