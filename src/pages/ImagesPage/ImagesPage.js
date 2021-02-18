import React from 'react';

import searchIconUrl from 'assets/images/search-icon.svg';
import ContentWithNav from 'shared/components/ContentWithNav';
import ImageView from 'shared/components/ImageView';
import imagesActions from 'shared/actions/imagesActions';

import styles from './ImagesPage.scss';

const isValidEarthDate = date => /\d{4}-\d{1,2}-\d{1,2}/.test(date);

const pageSize = 15;

const ImagesPage = () => {

  const [images, setImages] = React.useState();
  const [currentPageImages, setCurrentPageImages] = React.useState();
  const [selectedImage, setSelectedImage] = React.useState();

  const inputRef = React.useRef();

  const onSearch = React.useCallback(() => {

    const { value } = inputRef?.current || {};

    if (!value) {
      return;
    }

    if (!isValidEarthDate(value)) {
      return;
    }

    imagesActions.fetchMarsRoverImages({ earthDate: value }).then(setImages);

  }, [setImages]);

  React.useEffect(() => {
    setCurrentPageImages(images?.slice(0, pageSize)
      .map(({ alt, src, id }) => (
        <button onClick={() => { setSelectedImage({ alt, src }); }} key={id}>
          <img {...{ alt, src }}/>
        </button>
      )));
  }, [images]);

  return (
    <main className={styles.imagesPage}>
      <h3>Mars Images By Date</h3>

      <div className={styles.search}>
        <span>Earh date:</span>
        <input type="text" placeholder="Please enter date" ref={inputRef}/>
        <button onClick={onSearch}>
          Search
          <img alt="search icon" src={searchIconUrl}/>
        </button>
      </div>

      {images?.length && (
        <ContentWithNav
          numberOfPages={Math.ceil(images.length / pageSize)}
          onNavigation={({ pageIndex }) => {
            setCurrentPageImages(
              images.slice(
                pageIndex * pageSize,
                pageIndex * pageSize + pageSize,
              ).map(({ alt, src, id }) => (
                <button onClick={() => { setSelectedImage({ alt, src }); }} key={id}>
                  <img {...{ alt, src }}/>
                </button>
              )),
            );
          }}
          content={(
            <div className={styles.content}>
              {currentPageImages}
            </div>
          )}
        />
      )}

      {selectedImage && (
        <ImageView
          image={selectedImage}
          onCloseButtonClick={() => { setSelectedImage(null); }}
        />
      )}

    </main>
  );

};

export default ImagesPage;
