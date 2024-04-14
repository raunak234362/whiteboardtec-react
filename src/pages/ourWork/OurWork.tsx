import { useEffect } from 'react'
import { PageBanner, BannerPropType } from '../../components/banner';

const bannerData: BannerPropType = {
  header: "Our Work",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fportfolio-banner.jpg?alt=media&token=f540249a-168e-4932-b6ec-3e448450b88b",
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