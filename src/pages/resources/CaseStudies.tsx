import { PageBanner } from "../../components/banner";
import { ResourcePropType } from ".";
import { useEffect } from "react";

const props: ResourcePropType = {
  banner: {
    header: "Our Stories",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685612/banner-image/resource_lixfvx.jpg",
  },
  context: {
    desc: "Real-life stories of how we’ve helped our clients navigate through intricate design challenges. How we’ve impacted their businesses. Stories that continue to test our abilities, drive sustainable outcomes and push us towards newer frontiers of innovation. We are Whiteboardtec and we open our journey’s milestones to you.",
  },
  posts: {
    title: "Case Studies",
    desc: "Stories of our successes",
  },
};

function CaseStudies() {
  useEffect(() => {
    document.title = "CaseStudies - Resources - Whiteboard";
  });

  return (
    <>
      <PageBanner {...props.banner} />
      <div className="mx-auto my-0 bg-gray-100 w-ful lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="m-28 max-md:mx-0 mt-0 mb-10 p-2 grid grid-cols-[70%_30%] max-md:grid-cols-1 gap-4">
          <div className="order-1 max-md:order-2">
            <div className="mb-4 text-3xl font-bold text-black">
              {props.context?.head}
            </div>
            <div className="text-xl leading-loose text-gray-900">
              {props.context?.desc}
            </div>
          </div>

          <div className="bg-[#6abd45] rounded-md p-3 order-2 max-md:order-1">
            <div className="p-1 -mt-1 text-white h-fit">
              <div className="mb-4 text-3xl font-bold ">
                {props.posts?.title}
              </div>
              <div className="text-lg">{props.posts?.desc}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CaseStudies;
