import { useEffect } from 'react'
import { PageBanner, BannerPropType } from "../../components/banner";

const banner : BannerPropType = {
  header: "Services",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fservices.jpg?alt=media&token=559f32bf-520c-4b48-b308-da6dc49695ae"
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