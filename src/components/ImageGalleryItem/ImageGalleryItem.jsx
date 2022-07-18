import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClickModal }) => {
    return (
        <li className={s.imageGalleryItem}>
            <img
            className={s.imageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            onClick={onClickModal}
        />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClickModal: PropTypes.func.isRequired
   
};

export default ImageGalleryItem;