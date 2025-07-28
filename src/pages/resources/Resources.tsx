import { Link } from 'react-router-dom';
import { BannerPropType, PageBanner } from '../../components/banner';
import { useEffect } from 'react';

const banner: BannerPropType = {
  header: "Resources",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685612/banner-image/resource_lixfvx.jpg",
};

const data = [
  {
    head: "WBT Blogs",
    desc: "There's so much happening in our world all the time and we'd like to share our views, collaborate and exchange ideas with like-minded people like you. Read on and share your views.",
    link: "/resources/wbt-blog"
  },
  {
    head: "Case Studies",
    desc: "Real-life stories of how we’ve helped our clients navigate through intricate design challenges. How we’ve impacted their businesses. Stories that continue to test our abilities, drive sustainable outcomes and push us towards newer frontiers of innovation. We are Whiteboardtec and we open our journey’s milestones to you.",
    link: "/resources/case-studies"
  }
]



function Resources() {

  useEffect(()=> {
    document.title = "Resources - Whiteboard";
  })

  return (
    <>
      <PageBanner {...banner} />
      <section className="grid grid-cols-2 gap-10 p-2 mx-auto my-10 rounded-3xl m-28 max-md:grid-cols-1 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        {data.map((item, index) => (
          <div key={index} className='border-2 shadow-md rounded-3xl'>
            <div>
              <h2 className="text-3xl m-4 mb-2 font-bold text-[#6abd45]">{item.head}</h2>
              <div className='m-4 mt-0 text-lg truncate'>
                {item.desc}
              </div>
              <Link to={item.link}>
                <div className="m-4 mt-0 bg-[#6abd45] rounded-full text-md h-fit w-fit px-4 py-2 text-white">
                  Read More
                </div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Resources