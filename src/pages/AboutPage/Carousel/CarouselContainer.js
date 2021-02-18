import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CarouselView from './CarouselView';

const pageSizes = {
  MOBILE: 1,
  DESKTOP: 5,
};

const getElementFullWidth = element => {

  const style = (element.currentStyle || window.getComputedStyle(element));
  const { clientWidth } = element;
  const marginWidth = (parseFloat(style.marginLeft) + parseFloat(style.marginRight));
  const borderWidth = (parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth));
  
  return (clientWidth + marginWidth + borderWidth);
  
};

const CarouselContainer = ({ images, onImageClick }) => {

  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const trackRef = React.useRef();
  const numberOfPagesMobileSpanRef = React.useRef();
  const numberOfPagesDesktopSpanRef = React.useRef();

  const getCurrentPageSize = React.useCallback(() => {
    const isMobile = !!numberOfPagesMobileSpanRef.current.clientHeight;
    return (isMobile ? pageSizes.MOBILE : pageSizes.DESKTOP);
  }, []);

  const getCurrentNumberOfPages = React.useCallback(() => {
    return Math.ceil(images.length / getCurrentPageSize());
  }, [getCurrentPageSize, images]);

  const goToPage = React.useCallback(pageIndex => {

    const currentPageSize = getCurrentPageSize();
    const currentImageWidth = getElementFullWidth(trackRef.current.firstElementChild);
    const lastVisibleCardIndex = Math.min(((pageIndex + 1) * currentPageSize - 1), (images.length - 1));
    const firstVisibleCardIndex = Math.max((lastVisibleCardIndex - currentPageSize + 1), 0);

    trackRef.current.style.transform = `translateX(${-(firstVisibleCardIndex * currentImageWidth)}px)`;
    setCurrentPageIndex(pageIndex);

  }, [getCurrentPageSize, images]);

  const goToPreviousPage = React.useCallback(() => {

    if (currentPageIndex === 0) {
      return goToPage(getCurrentNumberOfPages() - 1);
    }

    return goToPage(currentPageIndex - 1);

  }, [currentPageIndex, getCurrentNumberOfPages, goToPage]);

  const goToNextPage = React.useCallback(() => {

    if (currentPageIndex === (getCurrentNumberOfPages() - 1)) {
      return goToPage(0);
    }

    return goToPage(currentPageIndex + 1);

  }, [currentPageIndex, getCurrentNumberOfPages, goToPage]);

  React.useLayoutEffect(() => {

    const onResize = _.throttle(() => goToPage(0));

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);

  }, [goToPage]);

  if (!images?.length) {
    return null;
  }

  return (
    <CarouselView
      {...{
        images,
        onImageClick,
        currentPageIndex,
        goToPreviousPage,
        goToNextPage,
        trackRef,
        numberOfPagesMobileSpanRef,
        numberOfPagesDesktopSpanRef,
        numberOfPagesMobile: Math.ceil(images.length / pageSizes.MOBILE),
        numberOfPagesDesktop: Math.ceil(images.length / pageSizes.DESKTOP),
      }}
    />
  );
  
};

CarouselContainer.defaultProps = {
  onImageClick() {},
};

CarouselContainer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
    }),
  ).isRequired,
  onImageClick: PropTypes.func,
};

export default CarouselContainer;
