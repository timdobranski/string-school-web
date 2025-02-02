'use client'

import Hero from '../../../components/Public/PublicHero/Hero';
import styles from './page.module.css';
import Review from '../../../components/Public/Review/Review';
import reviewsData from './reviewsData';

export default function ReviewsPage() {


  return (
    <div>
      {/* <Hero
        type={'photo'}
        title={['REVIEWS']}
        image={'/images/reviews-hero.webp'}
        imageStyles={{ filter: 'brightness(80%)'}}
        text={['Check out what people are saying about the La Mesa String School']}
      /> */}
      <div className={styles.reviewsWrapper}>
        <div className={styles.contentWrapper}>
        <h1 className={'sectionTitle'}>My Reviews</h1>
          <p className={styles.text}>{`I'm very proud of the feedback I've received from my students over the years. My students have become
        friends and even neighbors. See what everyone is saying about their experience learning with me below:`}</p>

          {reviewsData.map((review, index) => {
            return (
              <Review
                key={index}
                name={review.name}
                text={review.text}
                photo={review.photo}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}