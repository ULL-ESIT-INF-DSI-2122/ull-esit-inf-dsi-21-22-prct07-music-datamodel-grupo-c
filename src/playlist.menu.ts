import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { run } from './main'; // eslint-disable-line
import PlaylistManager from './playlitsManager.class';
import { PlaylistInterface } from './database.interfaces';

export const playlistManager: PlaylistManager = new PlaylistManager();

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
    .then((playlistMenuAnswers) => {
      switch (playlistMenuAnswers.playlistMenu) {
        case 'List all playlists': {
          console.log(playlistManager.preview());
          playlistMenu();
          break;
        }
        case 'Search playlist': {
          const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
          const serialized = playlistDb.get('playlists').value();
          const options = playlistManager
            .playlists
            .filter((playlist) => serialized
              .map((el: PlaylistInterface) => el.name)
              .includes(playlist.name));
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'playlistSearch',
                message: 'Choose a playlist:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((answerSearch) => {
              if (answerSearch.playlistSearch === 'Go Back') {
                console.clear();
                playlistMenu();
              } else {
                console.log(answerSearch);
              }
            });
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
