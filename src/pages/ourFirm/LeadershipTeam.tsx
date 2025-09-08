import { PageBanner, BannerPropType } from "../../components/banner";
import { LeaderDetailType } from ".";
import { useEffect } from "react";
const banner: BannerPropType = {
  header: "Leadership",
  subheader: "Team",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685611/banner-image/team-banner_p2bvys.jpg",
};

const team: LeaderDetailType[] = [
  {
    name: "Vishal L       Khandappanavar",
    designation: "CEO",
    thoughts: [
      "A spirited human being known as much for his wit as for his unbridled passion and commitment towards work. For him, people come first and that reflects in his ideology of a customer-focused delivery system. For over 15 years, Vishal has been a keen observer and a contributor to the Engineering Services Outsourcing (ESO) industry. Prior to founding Whiteboard Technologies, he spent several years working with multiple engineering service firms, taking them from start-up stages to established multi-million dollar enterprises. Be it sales & marketing, account management or technical detailing, Vishal always has a string of fresh, apt and highly valuable ideas brought to the table.",
      "It is no overstatement to say; he predicts key industry trends and insights before they evolve as trends. He has a Master’s Degree in Business Administration in International Marketing from the University of Queensland, Australia.",
    ],
    sociallink: "https://www.linkedin.com/in/vishallk/",
    image:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753686747/manage/Vishal_mwspqx.jpg",
  },
  {
    name: "Rajeshwari V Khandappanavar",
    designation: "MANAGING DIRECTOR",
    thoughts: [
      "As managing director at Whiteboard technologies, Rajeshwari has many hats to fill. Although what drives her profound passion for work is more than her title, it lies in discovering engineering complexities and finding innovative solutions for her clients. Prior to assuming the strategic seat at Whiteboard Technologies, she worked with multiple technology and media companies. From handling Key accounts at an interactive solutions company to working as a Sr. Copy Editor/Reporter for one of India’s largest media house, she has always taken on challenging projects and performed to the highest level of professionalism. As her team describes, she’s a burst of fresh energy and a people person by heart. Rajeshwari completed her MBA in Marketing from JNNCE, Shimoga. When off work, she loves gardening and practicing yoga.",
    ],
    sociallink:
      "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753686659/manage/Raj_dxyw5k.jpg",
    image: "/assets/Raj.jpg",
  },
];

function LeadershipTeam() {
  useEffect(() => {
    document.title = "Leadership Team - Whiteboard Tech";
  });

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-3 lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="grid grid-cols-1 p-2 mt-3 mb-10 gap-y-0 gap-x-0 max-md:gap-y-12 md:gap-x-10 md:grid-cols-2">
          {team.map((leader, index) => {
            return (
              <>
                <div
                  key={index}
                  className="bg-white border-2 shadow-lg rounded-xl drop-shadow-lg p-7"
                >
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <div className="text-[#6abd45] font-semibold text-4xl gap-5 flex flex-wrap flex-col">
                        {leader.name}
                      </div>
                      <div className="font-semibold text-black texl-2xl">
                        {leader.designation}
                      </div>
                    </div>

                    <div>
                      <img src={leader?.image} alt="leaders" className="h-44 rounded-xl" />
                    </div>
                  </div>
                  <div className="text-lg font-normal leading-relaxed text-justify text-gray-700">
                    {leader.thoughts.map((thought, index) => {
                      return (
                        <p key={index} className="my-2">
                          {thought}
                        </p>
                      );
                    })}
                  </div>
                  <div className="mt-8 text-lg font-normal leading-relaxed text-justify text-gray-700">
                    <p className="my-2">Say Hello</p>
                  </div>
                  <div>
                    <span className="[&>svg]:h-10 [&>svg]:w-8 my-2">
                      <button
                        type="button"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={() => {
                          window.open(leader.sociallink, "_blank");
                        }}
                        style={{ backgroundColor: "#0077b5" }}
                        className="inline-block rounded bg-[#0077b5] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                      >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512"
                          >
                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                          </svg>
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default LeadershipTeam;
