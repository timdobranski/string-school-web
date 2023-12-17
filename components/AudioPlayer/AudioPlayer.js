import React from 'react';

const AudioPlayer = ({ audioId }) => {
  // Construct the URL to your API route
  const audioUrl = `/api/streamAudio?id=${audioId}`;

  return (
    <div>
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;