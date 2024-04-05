import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";

const banner : BannerPropType = {
    header: "Gallery",
    image: "/src/assets/image/banner-image/team-banner.jpg",
}

function Gallery() {
  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
  })

  return (
    <>
        < PageBanner {...banner}/>
    </>
  )
}

export default Gallery;