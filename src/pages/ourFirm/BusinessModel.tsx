import { PageBanner, BannerPropType } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import { useEffect } from "react";

const banner: BannerPropType = {
  header: "Business",
  subheader: "Model",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685620/banner-image/business-model-banner_m8ujfv.jpg",
};

const treeData = [
  {
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685579/icons/pre-agreed_hgpaic.png",
    head: "Pre Agreed Project Model",
    body: "A preferred model amongst our clients. We engage on a very specific, pre-defined scope, on a project to project basis. We will provide a clear execution strategy along with a detailed statement of work for your review. We begin once the SOW is signed off. While the advantages of this model are many, we secure you with a pre-negotiated price that locks project cost overruns. Plus, there is complete transparency throughout the execution phase.",
  },
  {
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685578/icons/process_skpasx.png",
    head: "Time-and-Material Model",
    body: "We built this model to provide flexibility to our clients to modify the scope of varying workloads with repetitive work. The model works best with long/short-term contracts when using on-site or overseas labour at a fixed cost per month. The main advantage of this model is the availability of a team or a single resource at your disposal without incurring overheads needed to run the end-to-end execution of your project.",
  },
  {
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685578/icons/satellite-model_sb69ip.png",
    head: "Satellite Office Model",
    body: "The advantage of having a global presence has a direct impact on business operations profitability and P&L statements. An extended / satellite office can go a long way in improving your business investments such as excellent utilization of location specific resources. Additionally, these well qualified talented teams are available to you at lower captive costs than an onshore model.",
  },
];

function BusiessModel() {
  useEffect(()=> {
    document.title = "Busiess Model - Whiteboard Tech"
  })

  return (
    <>
        < PageBanner {...banner}/>
        <div className="pt-3 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="grid grid-cols-1 p-2 mt-3 mb-10 gap-y-10 gap-x-0 md:gap-y-5 md:gap-x-10 md:grid-cols-2">
        <Estimate head="Choose a model that suits your project requirements. Yes. You heard us right!" />
          {treeData.map((data, index) => {
            return data && (
              <div
                key={index}
                className={`rounded-xl border-2 shadow-lg drop-shadow-lg bg-white order-${index}`}
              >
                <div className="p-3 m-5">
                  <div className="text-2xl text-black ">
                    <img src={data.icon} alt="icon" className="w-16 h-16" />
                    {data.head}
                  </div>
                  <div className="my-2 text-lg text-justify text-gray-700">
                    {data.body}
                  </div>
                </div>
              </div>
            );
          })}

        </section>
      </div>
    </>
  )
}

export default BusiessModel;