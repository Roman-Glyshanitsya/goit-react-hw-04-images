import { Component } from 'react';
import { toast } from 'react-toastify';
import fetchImages from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPages: 1,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.searchImg !== this.props.searchImg || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetchImages
        .fetchImages(this.props.searchImg, page)
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            totalPages: Math.ceil(images.totalHits / 12),
            status: 'resolved',
          }));
          if (prevProps.searchImg !== this.props.searchImg) {
            this.setState({
              images: [...images.hits],
              status: 'resolved',
            });
          }
          if (!images.hits.length) {
            this.setState({ images: [], status: 'rejected' });
            toast.error(`Sorry, ${this.props.searchImg} not found`);
            return;
          }
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: img,
    }));
  };
  render() {
    const { images, error, status, page, totalPages, showModal, largeImage } =
      this.state;
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
                  onClickModal={() => this.toggleModal(largeImageURL)}
                />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {page !== totalPages && status === 'resolved' && (
            <Button onLoadMore={this.onLoadMore} />
          )}
        </>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={this.tags} className={s.modalImage} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImg: PropTypes.string.isRequired,
};

export default ImageGallery;