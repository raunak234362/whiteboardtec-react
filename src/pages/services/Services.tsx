import { useEffect } from 'react'
import { PageBanner, BannerPropType } from "../../components/banner";

const banner : BannerPropType = {
  header: "Services",
  image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/services_wmb8hr.jpg"
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