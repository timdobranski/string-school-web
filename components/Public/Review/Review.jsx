import styles from './Review.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYelp } from '@fortawesome/free-brands-svg-icons';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Review({ name, text, photo }) {
  return (
    <div className={styles.background}>
      <div className={`${styles.wrapper}`}>
        <FontAwesomeIcon icon={faYelp} className={styles.yelpIcon} />
        <div className={styles.header}>
          {photo ?
            <img src={photo} alt="Yelp Logo" className={styles.reviewerPhoto} /> :
            <div className={styles.reviewerIconWrapper}>
              <FontAwesomeIcon icon={faUser} className={styles.reviewerPhotoIcon} />
            </div>
          }
          <div className={styles.headerInfo}>
            <h3 className={`${styles.name}`}>{name}</h3>
            {/* Render 5 stars */}
            <div className={styles.stars}>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={styles.starIcon}
                  />
                ))}
            </div>
          </div>

        </div>


        <p className={`${styles.text}`}>{text}</p>

      </div>
    </div>
  );
}
