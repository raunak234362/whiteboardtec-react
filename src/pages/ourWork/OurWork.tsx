import { useEffect } from 'react'
import { PageBanner, BannerPropType } from '../../components/banner';

const bannerData: BannerPropType = {
  header: "Our Work",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/portfolio-banner_hziqaf.jpg",
};

function OurWork() {
  useEffect(() => {
    document.title = "Our Work - Whiteboard";
  }, []);

  return (
    <>
      <PageBanner {...bannerData} />
    </>
  )
}

export default OurWork