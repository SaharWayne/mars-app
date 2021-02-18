import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import leftArrowIconUrl from 'assets/images/left-arrow-icon.svg';
import rightArrowIconUrl from 'assets/images/right-arrow-icon.svg';

import styles from './ContentWithNav.scss';

const ContentWithNav = ({ numberOfPages, onNavigation, content }) => {
  
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  return (
    <div className={styles.contentWithNav}>

      <div className={styles.content}>
        {content}
      </div>

      <div className={styles.navigationButtons}>
        <button
          className={styles.leftArrow}
          onClick={() => {
            const previousPageIndex = Math.max(currentPageIndex - 1, 0);
            setCurrentPageIndex(previousPageIndex);
            onNavigation({ pageIndex: previousPageIndex });
          }}
          disabled={(currentPageIndex === 0)}
        >
          <img alt="previous page" src={leftArrowIconUrl}/>
        </button>
  
        {_.times(numberOfPages, n => (
          <button
            className={classNames({
              [styles.selected]: (n === currentPageIndex),
            })}
            onClick={() => {
              setCurrentPageIndex(n);
              onNavigation({ pageIndex: n });
            }}
            key={_.uniqueId('page-button-')}
          >
            {(n + 1)}
          </button>
        ))}
  
        <button
          className={styles.rightArrow}
          onClick={() => {
            const nextPageIndex = Math.min(currentPageIndex + 1, numberOfPages - 1);
            setCurrentPageIndex(nextPageIndex);
            onNavigation({ pageIndex: nextPageIndex });
          }}
          disabled={(currentPageIndex === (numberOfPages - 1))}
        >
          <img alt="next page" src={rightArrowIconUrl}/>
        </button>
      </div>

    </div>
  );

};

ContentWithNav.defaultProps = {
  content: null,
};

ContentWithNav.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  onNavigation: PropTypes.func.isRequired,
  content: PropTypes.node,
};

export default ContentWithNav;
