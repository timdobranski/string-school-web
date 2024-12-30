import styles from './PromoBlock.module.css';

export default function PromoBlock({title, text, photo, direction, background}) {

  return (
    <div className={styles.background} style={{background: `var(--${background})`}}>

      <div
        className={`${styles.wrapper} ${direction === 'left' ? styles.left : styles.right}`}

      >
        <div className={styles.textSide}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </div>

        <div className={styles.photoSide}>
          <img src={photo.image} alt='promo photo' className={styles.image} style={{...photo.styles}}/>

        </div>
      </div>
    </div>
  )
}