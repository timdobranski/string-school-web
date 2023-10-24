'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './AlphaTab.module.css';


export default function AlphaTab({ scoreData }) {
  const ref = useRef(null);
  const apiRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    apiRef.current = new window.alphaTab.AlphaTabApi(ref.current, {
      core: {
        tex: true
      },
      display: {
        staveProfile: "Default",
        resources: {
          // staffLineColor: "rgb(200, 10, 110)"
        }
      },
      notation: {
        elements: {
          scoreTitle: false,
          scoreWordsAndMusic: false,
          effectTempo: true,
          guitarTuning: false
        }
      },
      player: {
        scrollMode: "off",
        enablePlayer: true,
        enableUserInteraction: true,
        enableCursor: true,
        soundFont: `https://alphatab-kpy7o.codesandbox.io/sound_fonts/guitar_nylon.sf2`
      }
    });

    apiRef.current.soundFontLoaded.on(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <div className={styles.App}>
      <button
        onClick={() => {
          apiRef.current.play();
        }}
        disabled={!loaded}
      >
        play
      </button>
      <button
        onClick={() => {
          apiRef.current.pause();
        }}
        disabled={!loaded}
      >
        pause
      </button>
      <div ref={ref}>
        \tempo 220 \tuning A4 E4 C4 G4 . \ts 4 4 0.4 1.4 3.4 0.4 | 2.4 3.4 0.4
        2.4 | 3.4 0.3 2.3 0.2 | 1.2 3.2 0.1 1.1 | 3.1.1
      </div>
    </div>
  );
}


