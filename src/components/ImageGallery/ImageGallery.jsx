import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import fetchImages from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({searchImg}) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => setPage(1), [searchImg]);

  useEffect(() => {
    if (!searchImg) {
      return;
    }
    setStatus('pending');

    fetchImages
      .fetchImages(searchImg, page)
      .then(images => {
        setImages(prevState =>
          page > 1 ? [...prevState, ...images.hits] : images.hits
        );

        if (page === 1) {
          setTotalPages(Math.ceil(images.totalHits / 12));
        }

        setStatus('resolved');

        if (!images.hits.length) {
          setImages([]);
          setStatus('rejected');
          toast.error(`Sorry, ${searchImg} not found`);
          return;
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchImg, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = img => {
    setShowModal(!showModal);
    setLargeImage(img);
  };

    return (
      <>
        {status === 'rejected' && <h1>{error}</h1>}

        <>
          <ul className={s.imageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  onClickModal={() => toggleModal(largeImageURL)}
                />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {page !== totalPages && status === 'resolved' && (
            <Button onLoadMore={onLoadMore} />
          )}
        </>

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt="" className={s.modalImage} />
          </Modal>
        )}
      </>
    );
}

ImageGallery.propTypes = {
  searchImg: PropTypes.string.isRequired,
};
