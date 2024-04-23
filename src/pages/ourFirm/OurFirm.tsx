import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";

const banner: BannerPropType = {
  header: "Simplicity",
  subheader: "is the key to our success",
  image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Four-firm-banner.jpg?alt=media&token=99474f57-1520-4e97-bf86-1fd838e8e4c7",
};

const treeData = [
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fprocess.png?alt=media&token=624a0811-2b04-4672-bfa0-7071e4ee601e",
    head: "Process",
    body: "From ideation, design to execution, expect clarity and consistency in our execution workflow. Attuned to the AISC standards and adherence to a meticulous “Project Management Strategy” we methodically approach the shop drawings.",
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Ftech-icon.png?alt=media&token=07fa5299-c7bf-42c3-86a8-7290b5030897",
    head: "Technology",
    body: "Leveraging the latest 3D BIM modeling tools, we can produce the most advanced 3D models and shop drawings. These drawings ensure that the fabrication process is executed effortlessly, reducing rework and extended lead times.",
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Fassociate-members.png?alt=media&token=bdd733ec-5576-414d-8e2f-138e30db7e03",
    head: "AISC Associate Members",
    body: "We are committed to providing our clients with an exceptional level of service at all times. Our industry affiliation with AISC as an associate member reinforces our commitment to you.",
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Ficon%2Ftimeliness.png?alt=media&token=1fe6ff23-c664-4b6c-80bb-986536a3979e",
    head: "Timeliness",
    body: "A critical KPI but often overlooked or compromised. Today, many customers stand as advocates for us when it comes to operating in strict, committed and responsible timelines. Our Project Portal ensures your documents reach us seamlessly, collaborate online, track progress of your tasks and more.",
  },
];

function OurFirm() {
  useEffect(() => {
    document.title = "Our Firm - Whiteboard";
  });
  return (
    <>
      <PageBanner {...banner} />
      <div className="m-28 my-0 mx-auto  lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="rounded-3xl mt-3 border-4 p-2 grid grid-cols-[60%_40%] gap-3 shadow-xl drop-shadow-xl">
          <div className="m-4 pt-2 pl-4">
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              We understand how dynamic the structural steel industry is.
            </div>
            <p className="text-justify text-lg leading-relaxed">
              The constant design shifts, compliance, and adoption of modern
              software technologies have left the fabricators under immense
              pressure. Because we understand the challenges you are up against,
              we approach steel detailing through your lens.
            </p>
            <p className="text-justify text-lg leading-relaxed">
              For over two decades, we have perfected the art of professional
              Steel Design and Detailing with an unwavering focus on Quality and
              Design-Based thinking in all of our projects. We invest heavily in
              having the right people who understand steel from a value
              perspective and deliver contemporary solutions to a diverse range
              of construction projects. We lay high emphasis on Integrated
              Project Management to ensure there is a single touchpoint and not
              multiple channels of interactions. Our Hybrid-Delivery model
              offers On-site and Offshore to ensure that there is maximum
              utilization of resources round the clock.
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="bg-[#6abd45] rounded-xl flex flex-wrap flex-col w-full h-fit shadow-2xl m-4 mr-8 p-4">
              <h1 className="text-white text-3xl font-semibold px-4 pt-2">
                Vision
              </h1>
              <p className="text-justify text-md text-white px-4">
                To achieve a Top position in providing Engineering Services &
                Solutions spread through Civil / Mechanical and other ITES
                verticals.
              </p>
              <h1 className="text-white text-3xl font-semibold px-4 pt-4">
                Mission
              </h1>
              <p className="text-justify text-md text-white px-4 pb-4">
                To provide high-quality Engineering Services to our clients that
                adhere to industry's best project management practices driven by
                a skilled group of diverse teams who are committed to a service
                value that is uncompromising and focused on delivering a
                satisfying experience every time.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-100">
        <div className=" mx-auto lg:max-w-screen-lg xl:max-w-screen-xl pt-3">
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 gap-x-6 md:grid-cols-[35%_65%] lg:grid-cols-2">
            <div className="py-4 my-2 flex flex-row items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2Fproject-in-mind.jpg?alt=media&token=31be1cd7-e919-45ae-ae67-4fa80a8b6b02"
                alt="Have a large project in mind?"
              />
            </div>

            <div className="py-2 my-5">
              <div className="text-4xl text-[#6abd45] m-2">
                Have a <strong>large project</strong> in mind?
              </div>
              <div className="text-2xl m-2 my-5 font-bold text-gray-500">
                We can ramp up our internal resources faster at rocket speeds
                and still deliver responsibly.
              </div>
              <div className="text-md m-2 my-5 text-justify">
                Our success also comes from the fact that we leverage the most
                up to date, new age 3D softwares in the market to produce the
                most advanced shop drawings covering all critical aspects of the
                fabrication process.
              </div>
              <div className="text-2xl font-bold mx-2 mt-8 text-justify">
                Count on us to get your job done.
              </div>
              <div className="text-2xl font-bold mx-2 text-justify">
                On-time, every time!
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className=" mx-auto lg:max-w-screen-lg xl:max-w-screen-xl pt-3">
        <div className="text-4xl font-semibold my-2 text-[#6abd45] mt-7">
          Our Key Differentiators
        </div>
        <section className="mt-3 p-2 grid grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-2">
          {treeData.map((data, index) => {
            return (
              <div
                key={index}
                className="rounded-3xl border-2 shadow-lg drop-shadow-lg bg-white"
              >
                <div className="m-5 p-3">
                  <div className="text-[#6abd45] text-2xl font-semibold">
                    <img src={data.icon} alt="icon" className="w-10 h-10" />
                    {data.head}
                  </div>
                  <div className="my-2 text-gray-700 text-md text-justify">
                    {data.body}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="bg-[#6abd45]">
        <div className=" mx-auto lg:max-w-screen-lg xl:max-w-screen-xl pt-2 mt-3">
          <section className="mt-3 p-2 grid grid-cols-1 gap-y-0 gap-x-0 md:gap-y-5 md:gap-x-10 md:grid-cols-[45%_55%] lg:grid-cols-2">
            <div className="py-2 my-7 text-white">
              <div className="text-3xl font-bold">
                Project Management further simplified
              </div>
              <div className="text-lg my-3 text-justify">
                No more attachment size restrictions or adding documents on
                multiple email drives. Upload all your project documents,
                drawings, track and manage your projects all from a single
                dashboard. We know how important time is for you. And you don’t
                need to invest time to learn our tool. Just log right on and
                you’ll be in awe of the simplicity behind the design. As we
                said, we keep complexities to a minuscule or almost none.
              </div>
              <div className="text-2xl font-bold">Features</div>
              <div className="text-lg my-2 text-justify">
                <ul className="list-none list-inside">
                  <li className="flex-row flex justify-start mr-2 my-1">
                    <span className="m-1 mt-0.5">
                      <svg
                        className="h-4 w-4 text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          d="M18 15l-6-6l-6 6h12"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                    </span>
                    <span>
                      <span className="flex">Quick View of all your projects in one snapshot</span>
                    </span>
                  </li>
                  <li className="flex-row flex justify-start mr-2 my-1">
                    <span className="m-1 mt-0.5">
                      <svg
                        className="h-4 w-4 text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          d="M18 15l-6-6l-6 6h12"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                    </span>
                    <span>
                      <span className="flex">Live Tracking of projects. Assign and modify deadlines</span>
                    </span>
                  </li>
                  <li className="flex-row flex justify-start mr-2 my-1">
                    <span className="m-1 mt-0.5">
                      <svg
                        className="h-4 w-4 text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          d="M18 15l-6-6l-6 6h12"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                    </span>
                    <span>
                      <span className="flex">Collaborate with the WBT teams by sending feedback through direct messages</span>
                    </span>
                  </li>
                  <li className="flex-row flex justify-start items-start mr-2 my-1">
                    <span className="m-1 mt-0.5">
                      <svg
                        className="h-4 w-4 text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          d="M18 15l-6-6l-6 6h12"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                    </span>
                    <span>
                      <span className="flex">Upload and transfer big files between teams on the go</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:py-4 md:m-2 mb-10">
              <img
                className="shadow-lg drop-shadow-lg border-2 border-white rounded-md md:m-2"
                src="https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Finsite-images%2Fsimplified.jpg?alt=media&token=aeadf659-35d3-45c1-befd-1f452c8ba5bf"
                alt="Our Firm"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default OurFirm;
