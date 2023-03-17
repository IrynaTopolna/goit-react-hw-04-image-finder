import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

function ImageGalleryItem({ smallImg, largeImg, tags }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Image src={smallImg} alt={tags} onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img src={largeImg} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = PropTypes.shape({
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}).isRequired;

export default ImageGalleryItem;
