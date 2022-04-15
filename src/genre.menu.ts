import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Genre } from './genre.class';
import { run } from './main'; // eslint-disable-line
import GenresManager from './genresManager.class';
import { GenreInterface } from './database.interfaces';

const genresManager: GenresManager = new GenresManager();
const genreArray: Genre[] = [];

export function genreMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'genreMenu',
        message: 'Choose an action:',
        choices: [
          'List all genres',
          'Add new genre',
          'Save genre',
          'Edit genre',
          'Delete genre',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers: any) => {
      switch (answers.genreMenu) {
        case 'List all genres': {
          console.log(genresManager.preview());
          genreMenu();
          break;
        }
        case 'Add new genre': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'addName',
                message: 'Type new name:',
              },
              {
                type: 'input',
                name: 'addArtists',
                message: 'Type new artist:',
              },
              {
                type: 'input',
                name: 'addSongs',
                message: 'Type new song:',
              },
              {
                type: 'input',
                name: 'addAlbums',
                message: 'Type new genres:',
              },
            ])
            .then((newGenreAnswers: any) => {
              const newGenre: Genre = new Genre(
                newGenreAnswers.addName,
                newGenreAnswers.addArtists.split(',').map((el: string) => el.trim()),
                newGenreAnswers.addSongs.split(',').map((el: string) => el.trim()),
                newGenreAnswers.addAlbums.split(',').map((el: string) => el.trim()),
              );
              genresManager.createGenre(newGenre);
              genreArray.push(newGenre);
              console.log(newGenre);
              genreMenu();
            });
          break;
        }
        case 'Save genre': {
          const genresDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
          const serialized = genresDb.get('genres').value();
          const options = genresManager
            .genres
            .filter((genre) => !serialized
              .map((el: GenreInterface) => el.name)
              .includes(genre.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'genreEdit',
                message: 'Select a genre to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((editGenreAnswer: any) => {
              if (editGenreAnswer.genreEdit === 'Go Back') {
                console.clear();
                genreMenu();
              } else {
                const inx: number = genresManager.genres
                  .map((genre) => genre.name)
                  .indexOf(editGenreAnswer.genreEdit);
                console.log(inx);
                genresManager.saveGenre(inx);
                genreMenu();
              }
            });
          break;
        }
        case 'Edit genre': {
          const genresDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
          const serialized = genresDb.get('genres').value();
          const options = serialized
            .filter((genre: GenreInterface) => genre.origin === 'User')
            .map((el: GenreInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'genreEdit',
                message: 'Select a genre to Edit:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go back',
                ],
              },
            ]).then((editGenreAnswer: any) => {
              if (editGenreAnswer.songEdit === 'Go back') {
                console.clear();
                genreMenu();
              } else {
                const inx: number = genresManager.genres
                  .map((genre) => genre.name)
                  .indexOf(editGenreAnswer.genreEdit);
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'editArtists',
                      message: 'Edit artists:',
                    },
                    {
                      type: 'input',
                      name: 'editSongs',
                      message: 'Edit songs:',
                    },
                    {
                      type: 'input',
                      name: 'editAlbums',
                      message: 'Edit albums:',
                    },
                  ])
                  .then((editGenreAnswer) => {
                    let newArtistsEdit: string[] = editGenreAnswer.editArtists.split(',').map((el: string) => el.trim());
                    let newSongsEdit: string[] = editGenreAnswer.editSongs.split(',').map((el: string) => el.trim());
                    let newAlbumsEdit: string[] = editGenreAnswer.editAlbums.split(',').map((el: string) => el.trim());

                    if (newArtistsEdit.length === 0) {
                      newArtistsEdit = genresManager.genre(inx).artists;
                    }
                    if (newSongsEdit.length === 0) {
                      newSongsEdit = genresManager.genre(inx).songs;
                    }
                    if (newAlbumsEdit.length === 0) {
                      newAlbumsEdit = genresManager.genre(inx).albums;
                    }
                    const newGenre: Genre = new Genre(
                      genresManager.genre(inx).name,
                      newArtistsEdit,
                      newSongsEdit,
                      newAlbumsEdit,
                    );
                    genresManager.updateGenre(inx, newGenre);
                    genresManager.saveGenre(inx, true);
                    genreMenu();
                  });
              }
            });
          break;
        }
        case 'Delete genre': {
          const genresDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
          const serialized = genresDb.get('genres').value();
          const numberOfUserGenres: number = serialized.filter((genre: GenreInterface) => genre.origin === 'User').length;
          if (numberOfUserGenres > 0) {
            const options = serialized
              .filter((genre: GenreInterface) => genre.origin === 'User')
              .map((el: GenreInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'genreDelete',
                  message: 'Select a genre to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deleteGenreAnswer: any) => {
                if (deleteGenreAnswer.genreDelete === 'Go back') {
                  console.clear();
                  genreMenu();
                } else {
                  const inx: number = genresManager.genres
                    .map((genre) => genre.name)
                    .indexOf(deleteGenreAnswer.genreDelete);
                  genresManager.deleteGenre(inx);
                  console.clear();
                  genreMenu();
                }
              });
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
