import { Link } from 'react-router-dom';
import { BannerPropType, PageBanner } from '../../components/banner';
import { useEffect } from 'react';

const banner: BannerPropType = {
  header: "Resources",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fresource.jpg?alt=media&token=6d7ac0e9-0716-4c6d-8a83-acc05d210682",
}

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
      <section className="rounded-3xl m-28 p-2 grid grid-cols-2 gap-10 mx-auto my-10 lg:max-w-screen-xl">
        {data.map((item, index) => (
          <div key={index} className='rounded-3xl shadow-xl drop-shadow-xl border-4'>
            <div>
              <h2 className="text-3xl m-4 mb-2 font-bold text-[#6abd45]">{item.head}</h2>
              <div className='m-4 mt-0 truncate text-lg'>
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