import React from 'react';
import PropTypes from 'prop-types';

import leftArrowIconUrl from 'assets/images/left-arrow-icon.svg';
import rightArrowIconUrl from 'assets/images/right-arrow-icon.svg';

import styles from './CarouselView.scss';

const CarouselView = ({
  images,
  onImageClick,
  currentPageIndex,
  goToPreviousPage,
  goToNextPage,
  trackRef,
  numberOfPagesMobileSpanRef,
  numberOfPagesDesktopSpanRef,
  numberOfPagesMobile,
  numberOfPagesDesktop,
}) => (
  <div className={styles.carousel}>

    <div className={styles.trackAndLocation}>
      <div className={styles.track} ref={trackRef}>
        {images.map(({ alt, src, id }) => (
          <button key={id} onClick={() => onImageClick(({ alt, src }))}>
            <img {...{ alt, src }}/>
          </button>
        ))}
      </div>
      <span className={styles.location}>
        {`Page ${(currentPageIndex + 1)}/`}
        <span className={styles.pagesSizeMobile} ref={numberOfPagesMobileSpanRef}>
          {numberOfPagesMobile}
        </span>
        <span className={styles.pagesSizeDesktop} ref={numberOfPagesDesktopSpanRef}>
          {numberOfPagesDesktop}
        </span>
      </span>
    </div>
    
    <div className={styles.navigationButtons}>
      <button onClick={goToPreviousPage}>
        <img
          alt="previous page"
          src={leftArrowIconUrl}
        />
      </button>
      <button onClick={goToNextPage}>
        <img
          alt="next page"
          src={rightArrowIconUrl}
        />
      </button>
    </div>

  </div>
);

CarouselView.defaultProps = {
  onImageClick() {},
};

CarouselView.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
    }),
  ).isRequired,
  onImageClick: PropTypes.func,
  currentPageIndex: PropTypes.number.isRequired,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  trackRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  numberOfPagesMobileSpanRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  numberOfPagesDesktopSpanRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  numberOfPagesMobile: PropTypes.number.isRequired,
  numberOfPagesDesktop: PropTypes.number.isRequired,
};

export default CarouselView;
