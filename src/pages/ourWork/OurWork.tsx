import { useEffect } from 'react'
import { PageBanner, BannerPropType } from '../../components/banner';

const bannerData: BannerPropType = {
  header: "Our Work",
  image: "/src/assets/image/banner-image/portfolio-banner.jpg",
}

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