import * as alphaTab from '@coderline/alphatab';

export default async function alphatabReader(songFileLink) {
  // Initialize AlphaTab without any UI components
  const settings = {
    file: `/api/alphaTabPlayer?songFile=${encodeURIComponent(songFileLink)}`,    player: {
      enablePlayer: false,
    },
    display: {
      layoutMode: alphaTab.LayoutMode.Page,
    },
  };

  // Create a hidden element for AlphaTab to attach to
  const alphaTabContainer = document.createElement('div');
  alphaTabContainer.style.display = 'none';
  document.body.appendChild(alphaTabContainer);

  const api = new alphaTab.AlphaTabApi(alphaTabContainer, settings);

  api.scoreLoaded.on((score) => {
  // Access and log the score metadata
    console.log('Title:', score.title);
    console.log('Artist:', score.artist);
    console.log('Album:', score.album);
    console.log('Words:', score.words);
    console.log('Music:', score.music);
    console.log('Words and Music:', score.wordsAndMusic);
    // ...any other metadata you need

  // Optionally, return this data from a function or handle it as needed
  });

  // Error handling for the loading process
  api.renderFinished.on((success, error) => {
    if (!success) {
      console.error('Error loading the score:', error);
    }
  });

  // Load the score
  api.load(scoreFileLink);

}

