import { PageBanner } from "../../components/banner"
import { ResourcePropType } from ".";
import { useEffect } from "react";

const props: ResourcePropType = {
  banner: {
    header: "Our Stories",
    image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fresource.jpg?alt=media&token=6d7ac0e9-0716-4c6d-8a83-acc05d210682",
  },
  context: {
    desc: "Real-life stories of how we’ve helped our clients navigate through intricate design challenges. How we’ve impacted their businesses. Stories that continue to test our abilities, drive sustainable outcomes and push us towards newer frontiers of innovation. We are Whiteboardtec and we open our journey’s milestones to you."
  },
  posts: {
    title: "Case Studies",
    desc: "Stories of our successes"
  }
}

function CaseStudies() {
  useEffect(()=> {
    document.title = "CaseStudies - Resources - Whiteboard";
  })

    return (
      <>
        <PageBanner {...props.banner} />
        <div className="w-ful bg-gray-100 mx-auto my-0 lg:max-w-screen-xl">
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

export default CaseStudies