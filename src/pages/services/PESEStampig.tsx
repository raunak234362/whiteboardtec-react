import { useEffect } from "react"
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";

const banner: BannerPropType = {
  header: "Connection Design",
  subheader: "and PE/SE Stamping",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685615/banner-image/pese-banner_vqgyve.jpg",
};

const headSection:string[] = [
  "From the simplest to the most complex connection configurations, our experienced team can interpret and achieve detailed drawings that are accurate and in compliance with the AISC Standards at all times. Our scope of services span across Welded, Bolted, Standard, and Non–Standard Shear Connections to Braces and Trusses and everything in between. Complexities motivate us and we take them head-on!",
  "We’re also the “A” team when it comes to dealing with steel connections that require heavy customizations. Fabricators and Erectors have turned to us to help them navigate through the intricate connection design challenges across a range of industries and projects."
]

function PESEStampig() {
  useEffect(() => {
    document.title = "Connection Design And PE/SE Stamping - Whiteboard Tech"
  })

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-0 m-28 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md max-md:grid-cols-1">
          <div className="m-4 leading-loose text-gray-700">
          <div className="text-3xl font-bold my-2 text-[#6abd45]">
          Connection Solutions
            </div>
            {headSection?.map((desc, index) => {
              return (
                <p key={index} className="text-lg leading-relaxed text-justify">
                  {desc}
                </p>
              );
            })}
            <div className="my-2 text-xl font-semibold text-Black">
            Have a complex design project that needs our review? Get in touch with us for a free consultation today
            </div>
          </div>
          <Estimate head="Get your Connection Design and PE/SE Stamping Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      <div className="mb-3 bg-gray-100 shadow-lg drop-shadow-lg">
        <div className="pt-3 mx-auto mt-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="mt-3p-2 grid grid-cols-[65%_35%] gap-3 max-md:grid-cols-1">
            <div className="flex flex-col flex-wrap justify-center">
              <div className="text-[#6abd45] text-3xl font-semibold max-md:mx-2">
              PE/SE Stamping
              </div>
              <div className="my-2 mr-10 text-lg text-justify max-md:mx-2">
              <p className="my-2">Through a network of Professional Engineers we have the capability of providing full-spectrum PE/SE Stamping services to Fabricators and Erectors in the U.S & Canada.</p>
              <p className="my-2">Our partners are licensed to practice across all 50 states in the U.S and can certify your calculations with paramount accuracy. We undertake PE/SE reviews for all your project documentation and engineering documents.</p>
              <p className="my-2 text-lg"><strong>Need your document stamped? Submit your documents on our Project Portal right away</strong></p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center m-5 item-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2Fconnection-design.png?alt=media&token=97c68e23-c816-44cd-8a17-90880114816e" alt="Equal Opportunity"/>
            </div>
          </section>
        </div>
      </div>

      <Newsletter />
    </>
  )
}

export default PESEStampig