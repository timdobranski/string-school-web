'use client'
import styles from './PromoBlock.module.css';
import parse from 'html-react-parser';

export default function PromoBlock({ title, text, photo, direction, background, titleClassName }) {
  return (
    <div className={styles.background} style={{ background: `var(--${background})` }}>
      <div
        className={`${styles.wrapper} ${direction === 'left' ? styles.left : styles.right}`}
      >
        <div className={styles.textSide}>
          <h3 className={`${'smallerSectionTitle'} ${styles[titleClassName]}`}>{title}</h3>
          <p className={`${titleClassName === 'whiteTitle' ? styles.whiteText : styles.text}`}>
            {parse(text)}
          </p>
        </div>

        <div className={styles.photoSide}>
          <img
            src={photo.image}
            alt="promo photo"
            className={styles.image}
            style={{ ...photo.styles }}
          />
        </div>
      </div>
    </div>
  );
}
