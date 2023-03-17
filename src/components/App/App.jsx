import { useEffect, useState } from 'react';
import Searchbar from '../Searchbar';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from 'GlobalStyles';
import Layout from 'Layout/Layout';
import { AppStyles, Greet } from './App.styled';
import { getImages } from 'api/images-api';
import ErrorView from 'components/ErrorView';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

const PER_PAGE = 12;

export default function App() {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (searchWord === '') {
      return;
    }

    setStatus('pending');

    getImages(searchWord, page, PER_PAGE)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Sorry, no images were found'));
      })
      .then(newImages => {
        if (newImages.hits.length === 0) {
          setStatus('rejected');
          return;
        }

        setImages(prevState => [...prevState, ...newImages.hits]);
        setTotalImages(newImages.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        console.log(error);
      });
  }, [searchWord, page]);

  const handleLoad = () => {
    setPage(prevState => prevState + 1);
    setStatus('pending');

    console.log(searchWord);
    console.log('page', page + 1);
  };

  const onInputChange = searchWord => {
    console.log(searchWord);
    console.log('page', 1);
    setSearchWord(searchWord);
    setImages([]);
    setPage(1);
  };

  const pages = Math.round(totalImages / PER_PAGE);
  return (
    <Layout>
      <AppStyles>
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />
        <Searchbar onSearch={onInputChange} />
        {status === 'idle' && (
          <Greet>
            Welcome to images and photos finder! Please, enter your search
            request
          </Greet>
        )}

        {status === 'rejected' && <ErrorView />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} page={page} />
            {status === 'resolved' && page <= pages && (
              <Button onLoad={handleLoad} />
            )}
          </>
        )}
        {status === 'pending' && <Loader />}
      </AppStyles>
      <GlobalStyles />
    </Layout>
  );
}
