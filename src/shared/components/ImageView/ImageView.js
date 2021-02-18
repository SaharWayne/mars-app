import React from 'react';
import PropTypes from 'prop-types';

import closeIconUrl from 'assets/images/close-icon.svg';

import styles from './ImageView.scss';

const ImageView = ({ image: { alt, src }, onCloseButtonClick }) => (
  <div className={styles.imageView}>
    <button onClick={onCloseButtonClick}>
      <img alt="close" src={closeIconUrl}/>
    </button>
    <img {...{ alt, src }}/>
  </div>
);

ImageView.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }).isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};

export default ImageView;
