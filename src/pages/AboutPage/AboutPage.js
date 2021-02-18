import React from 'react';
import { Link } from 'react-router-dom';

import { pathNames } from 'shared/routes/consts';
import imagesActions from 'shared/actions/imagesActions';
import ImageView from 'shared/components/ImageView';
import marsRoverImageUrl from 'assets/images/mars-rover.jpg';

import Carousel from './Carousel';
import styles from './AboutPage.scss';

const AboutPage = () => {

  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState();

  React.useEffect(() => {
    imagesActions.fetchMarsRoverImages().then(setImages);
  }, []);

  return (
    <main>

      <h1>About The Program</h1>

      <section className={styles.summarySection}>
        <img alt="mars rover" src={marsRoverImageUrl}/>
        <div className={styles.textAndNavigation}>
          <div className={styles.text}>
            <p>
              {`Part of NASA's Mars Science Laboratory mission,
              Curiosity is the largest and most capable rover ever sent to Mars.
              It launched November 26, 2011 and landed on Mars at 10:32 p.m.
              PDT on Aug. 5, 2012 (1:32 a.m. EDT on Aug. 6, 2012).
              Curiosity set out to answer the question:
              Did Mars ever have the right environmental conditions to support
              small life forms called microbes? Early in its mission,
              Curiosity's scientific tools found chemical and mineral evidence of
              past habitable environments on Mars. It continues to explore the rock
              record from a time when Mars could have been home to microbial life`}.
            </p>
          </div>
          <div className={styles.navigation}>
            <button>
              <Link to={pathNames.IMAGES}>View Images By Date</Link>
            </button>
            <button>
              <Link to={pathNames.WEATHER}>View Weather</Link>
            </button>
          </div>
        </div>
      </section>

      <section className={styles.imagesFromTodaySection}>
        <h3>Curiosity rover images <span className={styles.brown}>from today</span></h3>
        <Carousel
          images={images}
          onImageClick={setSelectedImage}
        />
        {selectedImage && (
          <ImageView
            image={selectedImage}
            onCloseButtonClick={() => { setSelectedImage(null); }}
          />
        )}
      </section>

    </main>
  );
};

export default AboutPage;
