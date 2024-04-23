import { PageBanner } from "../../components/banner"
import { ResourcePropType } from ".";
import { useEffect } from "react";

const props: ResourcePropType = {
  banner: {
    header: "Hey, Thanks",
    subheader: "for visiting our blog.",
    image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fresource.jpg?alt=media&token=6d7ac0e9-0716-4c6d-8a83-acc05d210682",
  },
  context: {
    desc: "There's so much happening in our world all the time and we’d like to share our views, collaborate and exchange ideas with like-minded people like you. Read on and share your views."
  },
  posts: {
    title: "Featured Posts",
    desc: "Trending business and technology topics"
  }
}


function WbtBlog() {
  useEffect(()=> {
    document.title = "WBT Blog- Resources - Whiteboard";
  })

  return (
    <>
      <PageBanner {...props.banner} />
      <div className="w-ful bg-gray-100 my-0 mx-auto lg:max-w-screen-xl">
      <section className="m-28 mt-0 mb-10 p-2 grid grid-cols-[70%_30%] gap-4">
        <div>
          <div className="text-3xl font-bold text-black mb-4">{props.context?.head}</div>
          <div className="text-xl leading-loose text-gray-900">{props.context?.desc}</div>
        </div>

        <div>
          <div className="bg-[#6abd45] rounded-md h-fit m-3 p-4 -mt-1 text-white">
          <div className="text-3xl font-bold  mb-4 ">{props.posts?.title}</div>
          <div className="text-lg">{props.posts?.desc}</div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default WbtBlog