import { useEffect } from 'react'
import { PageBanner, BannerPropType } from "../../components/banner";

const banner : BannerPropType = {
  header: "Services",
  image: "/src/assets/image/banner-image/services.jpg"
}


function Services() {
  useEffect(()=> {
    document.title = "Services - Whiteboard";
  })
  return (
    <>
      <PageBanner {...banner} />
    </>
  )
}

export default Services