import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css'



const ImageCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    return (
      <Slider className="slider" {...settings}>
        <div className="car">
          <img src="https://img.freepik.com/premium-vector/final-sale-header-banner-with-50-percent-discount_419341-942.jpg?w=2000" alt="Image 1" />
        </div>
        <div className="car">
          <img src="https://media.istockphoto.com/id/1271475940/vector/back-to-school-sale-header-or-banner-design-with-50-discount-offer-and-education-supplies.jpg?s=170667a&w=0&k=20&c=TCITUfiIm9cEVI_46lCShKOny_6uDqYjPSOFA2ep1Sg=" alt="Image 2" />
        </div>
        <div className="car">
          <img src="https://media.istockphoto.com/id/599975696/vector/summer-sale-banner.jpg?s=612x612&w=0&k=20&c=FinKxZyyWnfyt3GuoH9eutB_ANaZhP9kXanjnohzu1U=" alt="Image 3" />
        </div>
        {/* Add more images as needed */}
      </Slider>
    );
  };

  export default ImageCarousel;
