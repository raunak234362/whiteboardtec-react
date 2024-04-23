import { PageBanner, BannerPropType } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import { useEffect } from "react";

const banner : BannerPropType = {
    header: "Business",
    subheader: "Model",
    image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fbusiness-model-banner.jpg?alt=media&token=a0893110-8c75-4aab-99d5-29cf829048f3",
}

const treeData = [
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fpre-agreed.png?alt=media&token=a294ad43-6b05-45e4-ae6e-2d32cd9f0c5b",
    head: "Pre Agreed Project Model",
    body: "A preferred model amongst our clients. We engage on a very specific, pre-defined scope, on a project to project basis. We will provide a clear execution strategy along with a detailed statement of work for your review. We begin once the SOW is signed off. While the advantages of this model are many, we secure you with a pre-negotiated price that locks project cost overruns. Plus, there is complete transparency throughout the execution phase.",
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Ftime-meterial.png?alt=media&token=99248588-7e7d-4000-b689-1fcd7cd0fd28",
    head: "Time-and-Material Model",
    body: "We built this model to provide flexibility to our clients to modify the scope of varying workloads with repetitive work. The model works best with long/short-term contracts when using on-site or overseas labour at a fixed cost per month. The main advantage of this model is the availability of a team or a single resource at your disposal without incurring overheads needed to run the end-to-end execution of your project.",
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fsatellite-model.png?alt=media&token=9b61a659-6b47-4073-a76d-4fc51a4dde35",
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
        <section className="mt-3 mb-10 p-2 grid grid-cols-1 gap-y-10 gap-x-0 md:gap-y-5 md:gap-x-10 md:grid-cols-2">
        <Estimate head="Choose a model that suits your project requirements. Yes. You heard us right!" />
          {treeData.map((data, index) => {
            return data && (
              <div
                key={index}
                className={`rounded-xl border-2 shadow-lg drop-shadow-lg bg-white order-${index}`}
              >
                <div className="m-5 p-3">
                  <div className="text-black text-2xl font-semibold">
                    <img src={data.icon} alt="icon" className="w-10 h-10" />
                    {data.head}
                  </div>
                  <div className="my-2 text-gray-700 text-lg text-justify">
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