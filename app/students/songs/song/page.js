'use client'

import React, { useEffect, useState, useRef } from 'react';

export default function Song() {
  const [metadata, setMetadata] = useState(null);
  const iframeRef = useRef(null);

  // Your AlphaTab HTML file URL
  const alphatabHtmlUrl = '/alphatab/alphatabReader.html?songFile=https://drive.google.com/uc?id=1aT_U51vpCRcedC_-wfCpSE4wWjnRprrZ&export=download';

  // Function to send file URL to iframe
  const loadFileInIframe = () => {
    iframeRef.current.contentWindow.postMessage({
      type: 'loadFile',
      fileUrl: '/api/alphaTabPlayer?songFile=https://drive.google.com/uc?id=1aT_U51vpCRcedC_-wfCpSE4wWjnRprrZ&export=download'
    }, '*');
  };

  // Message handler for receiving metadata
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'metadata') {
        setMetadata(event.data.metadata);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Load the file when the component mounts
  useEffect(() => {
    loadFileInIframe();
  }, []);

  useEffect(() => {
    console.log('metadata: ', metadata);
  }, [metadata])

  return (
    <div className='infoCard'>
      {metadata && (
        <div>
          <p>Title: {metadata.title}</p>
          <p>Artist: {metadata.artist}</p>
          {/* Render other metadata as needed */}
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={alphatabHtmlUrl}
        style={{ display: 'none' }}
        title="AlphaTab Metadata Extractor"
      ></iframe>
    </div>
  );
}
