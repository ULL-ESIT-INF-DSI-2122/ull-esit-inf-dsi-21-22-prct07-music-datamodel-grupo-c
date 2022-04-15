          inquirer
            .prompt([
              {
                type: 'list',
                name: 'playlistActions',
                message: 'Choose an action:',
                choices: [
                  'Sort playlist',
                  'List playlist',
                  'Add Song to a playlist',
                  'Delete Song from a playlist',
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ])
            .then((playlistActionsAnswers) => {
              switch (playlistActionsAnswers.playlistActions) {
                case 'Sort playlist': {
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'sortMenu',
                        message: 'Choose an sort method:',
                        choices: [
                          'By song name',
                          'By duration',
                          'By artist',
                          'By year',
                          'By genre',
                          'By number of listeners',
                          new inquirer.Separator(),
                          'Go Back',
                          new inquirer.Separator(),
                        ],
                      },
                    ])
                    .then((sortAnswers) => {
                      switch (sortAnswers.songMenu) {
                        case 'By song name': {
                          inquirer
                            .prompt([
                              {
                                type: 'list',
                                name: 'nameAscDesc',
                                message: 'Asc or Desc?:',
                                choices: [
                                  'Asc',
                                  'Desc',
                                  new inquirer.Separator(),
                                  'Go Back',
                                ],
                              },
                            ])
                            .then((nameSortAnswers) => {
                              switch (nameSortAnswers.nameAscDesc) {
                                case 'Asc': {
                                  break;
                                }
                                case 'Desc': {
                                  break;
                                }
                                default: {
                                  break;
                                }
                              }
                            });
                          break;
                        }
                        // case 'By duration': {
                        //   break;
                        // }
                        // case 'By artist': {
                        //   break;
                        // }
                        // case 'By year': {
                        //   break;
                        // }
                        // case 'By genre': {
                        //   break;
                        // }
                        // case 'By number of listeners': {
                        //   break;
                        // }
                        // case 'Go Back': {
                        //   break;
                        // }
                        default: {
                          break;
                        }
                      }
                    });
                  break;
                }
                // case 'List playlist': {
                //   break;
                // }
                // case 'Add Song to a playlist': {
                //   break;
                // }
                // case 'Delete Song from a playlist': {
                //   break;
                // }
                // case 'Go Back': {
                //   break;
                // }
                default:
                  break;
              }
            });
          // playlistMenu();
          break;