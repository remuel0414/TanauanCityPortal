import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { firestore } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';

const PictureGallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    centerMode: true,
    centerPadding: '25%',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0',
        }
      }
    ]
  };

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderImageUrl = 'https://via.placeholder.com/1200x800';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'pictures'));
        const imagesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return data.imageURL;
        });
        setImages(imagesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (images.length === 0) {
    return <div>No images found.</div>;
  }

  return (
    <div className="picture-gallery-container py-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Picture Gallery</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={image || placeholderImageUrl}
              onError={(e) => { e.target.src = placeholderImageUrl }}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 md:h-128 object-cover rounded-lg shadow-lg gallery-image"
              style={{ transition: 'transform 0.3s ease-in-out' }}
              onMouseOver={(e) => { e.target.style.transform = 'scale(1.1) translateY(-5%)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'scale(1) translateY(0)'; }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PictureGallery;
