import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { run } from './main'; // eslint-disable-line
import { AlbumInterface } from './database.interfaces';
import AlbumsManager from './albumsManager.class';
import { Album } from './album.class';

const albumsManager: AlbumsManager = new AlbumsManager();

export function albumMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'albumMenu',
        message: 'Choose an action:',
        choices: [
          'List all albums',
          'Add new album',
          'Save album',
          'Edit album',
          'Delete album',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.albumMenu) {
        case 'List all albums': {
          console.log(albumsManager.preview());
          albumMenu();
          break;
        }
        case 'Add new album': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'addName',
                message: 'Type new name:',
              },
              {
                type: 'input',
                name: 'addArtist',
                message: 'Type new artist/group:',
              },
              {
                type: 'input',
                name: 'addYear',
                message: 'Type new release year:',
                validate(value) {
                  const pass = value.match(
                    /^[0-9]*$/,
                  );
                  if (pass) {
                    return true;
                  }
                  return 'Please enter a number';
                },
              },
              {
                type: 'input',
                name: 'addGenres',
                message: 'Type new genres:',
              },
            ])
            .then((newAlbumAnswers) => {
              const newAlbum: Album = new Album(
                newAlbumAnswers.addName,
                newAlbumAnswers.addArtist,
                Number(newAlbumAnswers.addYear),
                [...newAlbumAnswers.addGenres.split(' ')],
              );
              albumsManager.createAlbum(newAlbum);
              albumMenu();
            });
          break;
        }
        case 'Save album': {
          const albumsDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
          const serialized = albumsDb.get('albums').value();
          const options = albumsManager
            .albums
            .filter((album) => !serialized
              .map((el: AlbumInterface) => el.name)
              .includes(album.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'albumEdit',
                message: 'Select an album to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((editAlbumAnswers) => {
              if (editAlbumAnswers.albumEdit === 'Go Back') {
                console.clear();
                albumMenu();
              } else {
                const inx: number = albumsManager.albums
                  .map((album) => album.name)
                  .indexOf(editAlbumAnswers.albumEdit);
                albumsManager.saveAlbum(inx);
                albumMenu();
              }
            });
          break;
        }
        case 'Edit album': {
          const albumsDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
          const serialized = albumsDb.get('albums').value();
          const options = serialized
            .filter((album: AlbumInterface) => album.origin === 'User')
            .map((el: AlbumInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'albumEdit',
                message: 'Select an album to Edit:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go back',
                ],
              },
            ]).then((editAlbumAnswer) => {
              if (editAlbumAnswer.albumEdit === 'Go back') {
                console.clear();
                albumMenu();
              } else {
                const inx: number = albumsManager.albums
                  .map((album) => album.name)
                  .indexOf(editAlbumAnswer.albumEdit);
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'editArtist',
                      message: 'Edit artist:',
                    },
                    {
                      type: 'input',
                      name: 'editYear',
                      message: 'Edit release year:',
                      validate(value) {
                        const pass = value.match(
                          /^[0-9]*$/,
                        );
                        if (pass) {
                          return true;
                        }
                        return 'Please enter a number';
                      },
                    },
                    {
                      type: 'input',
                      name: 'editGenres',
                      message: 'Edit genres:',
                    },
                  ])
                  .then((editAlbumAnswers) => {
                    const newArtistEdit: string = editAlbumAnswers.editArtist === ''
                      ? albumsManager.album(inx).artist
                      : editAlbumAnswers.editArtist;
                    const newReleaseYear: number = editAlbumAnswers.editYear === ''
                      ? albumsManager.album(inx).year
                      : Number(editAlbumAnswers.editYear);
                    const newGenresEdit: string[] = editAlbumAnswers.editGenres === ''
                      ? albumsManager.album(inx).genres
                      : [...editAlbumAnswers.editGenres.split(' ')];

                    const newAlbum: Album = new Album(
                      albumsManager.album(inx).name,
                      newArtistEdit,
                      newReleaseYear,
                      newGenresEdit,
                    );
                    albumsManager.updateAlbum(inx, newAlbum);
                    albumsManager.saveAlbum(inx, true);
                    albumMenu();
                  });
              }
            });
          break;
        }
        case 'Delete album': {
          const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
          const serialized = albumDb.get('albums').value();
          const numberOfUserAlbums: number = serialized.filter((album: AlbumInterface) => album.origin === 'User').length;
          if (numberOfUserAlbums > 0) {
            const options = serialized
              .filter((album: AlbumInterface) => album.origin === 'User')
              .map((el: AlbumInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'albumDelete',
                  message: 'Select an album to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deleteAlbumAnswer) => {
                if (deleteAlbumAnswer.albumDelete === 'Go back') {
                  console.clear();
                  albumMenu();
                } else {
                  const inx: number = albumsManager.albums
                    .map((album) => album.name)
                    .indexOf(deleteAlbumAnswer.albumDelete);
                  albumsManager.deleteAlbum(inx);
                  console.clear();
                  albumMenu();
                }
              });
          } else {
            console.clear();
            console.log('No user albums in database, System albums are prohibited');
            albumMenu();
          }
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
