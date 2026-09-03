import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BannerPropType, PageBanner } from "../../components/banner";

const banner: BannerPropType = {
  header: "Life at",
  subheader: "Whiteboard",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1788338398/4f9e9cfb-910e-4da1-bf84-0008c44a2dfb.png",
  height: "h-[20rem] md:h-[24rem] max-md:h-48",
};

const employeePromise = [
  {
    title: "Purpose-Driven Work",
    desc: "Every 3D model, connection design, and detailing drawing you craft directly shapes iconic buildings and infrastructure across North America.",
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685576/icons/work-icon_qbsh4o.png",
  },
  {
    title: "People-First Culture",
    desc: "We prioritize empathy, open communication, and mutual respect. We operate with a flat hierarchy where every voice is heard and valued.",
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685580/icons/people-icon_o8b5nn.png",
  },
  {
    title: "Modern Ecosystem",
    desc: "Access best-in-class hardware, high-speed infrastructure, and latest software tools (Tekla, SDS/2, Revit) to perform at your best.",
    icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685577/icons/tech-icon_e2gofv.png",
  },
];

const lifeHighlights = [
  {
    title: "Team Outings & Annual Retreats",
    desc: "From outdoor adventure trips to casual Friday team dinners, we believe in celebrating our milestones together and building bonds beyond work.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685708/route-image/our-firm_qbwtod.jpg",
    badge: "Outings & Fun",
  },
  {
    title: "Diwali & Festive Celebrations",
    desc: "Festivals are celebrated with grand spirit! Office decorations, ethnic dress days, cultural activities, festive feasts, and joy all around.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685709/route-image/careers_jvwsl8.jpg",
    badge: "Celebrations",
  },
  {
    title: "Gifts & Special Rewards",
    desc: "We love appreciating our team! Festival hampers, performance recognition rewards, work anniversary gifts, and surprise goodies throughout the year.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685705/route-image/our-work_vjdmss.jpg",
    badge: "Rewards",
  },
  {
    title: "Modern Workspace & Refreshment Areas",
    desc: "Ergonomic seating, transparent open layouts and dedicated relaxation & coffee zones to recharge.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685704/route-image/services_cmbnnq.jpg",
    badge: "Workplace",
  },
  {
    title: "Work-Life Balance & Wellness",
    desc: "Predictable working hours, zero-burnout philosophy, supportive leave policies, and health wellness initiatives to keep you energized.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685709/route-image/connect_rrusr9.jpg",
    badge: "Wellbeing",
  },
];

const growthPoints = [
  {
    question: "Will I actually grow here?",
    answer:
      "Absolutely. We invest heavily in your professional development. Through structured mentorship from industry veterans, hands-on exposure to complex North American projects, and continuous training on advanced BIM & 3D software, your learning curve remains steep and rewarding.",
  },
  {
    question: "Who will I work with?",
    answer:
      "You'll collaborate with some of the finest structural engineers, detailing experts, Tekla specialists, and project managers. Our team is passionate, approachable, and always ready to lend a helping hand or share knowledge.",
  },
];

const LifeAtwbt = () => {
  useEffect(() => {
    document.title = "Life at WBT - Whiteboard";
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <PageBanner {...banner} />

      <div className="mx-auto my-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4">
        
        {/* 2. WHY US / EMPLOYEE PROMISE SECTION */}
        <section className="mb-16">
          

          <div className="rounded-3xl border-2 p-2 grid grid-cols-[60%_40%] gap-3 shadow-md bg-white max-md:grid-cols-1 mb-8">
            <div className="order-1 m-4 leading-loose max-md:order-2">
              <h3 className="text-3xl font-bold text-[#6abd45] my-2">
                What makes working here different?
              </h3>
              <p className="text-lg text-gray-700 text-justify mb-4">
                At Whiteboard, you aren't just another employee in a cubicle. You are a key contributor to an engineering powerhouse. We blend technical excellence with a warm, supportive culture where your growth is championed and your achievements are celebrated.
              </p>
              <p className="text-lg text-gray-700 text-justify">
                We believe when talented minds are provided with freedom, top-tier tools, and a healthy work environment, extraordinary things happen.
              </p>
            </div>

            <div className="order-2 max-md:order-1 p-4 flex flex-col">
              <div className="bg-[#6abd45] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-center w-full h-full">
                <h4 className="text-2xl font-bold mb-3">Our Promise To You</h4>
                <ul className="space-y-3 text-md opacity-95">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-xl">✓</span> Continuous skill enhancement & real mentorship
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-xl">✓</span> Transparent rewards & performance recognition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-xl">✓</span> Respect for your time and personal well-being
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-xl">✓</span> Friendly, collaborative, and inclusive environment
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Employee Promise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employeePromise.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border-2 shadow-md rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={item.icon} alt={item.title} className="w-10 h-10" />
                  <h4 className="text-xl font-bold text-black">{item.title}</h4>
                </div>
                <p className="text-gray-700 text-md leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. GROWTH & LEARNING SECTION */}
        <section className="mb-16 bg-gray-50 rounded-3xl p-8 border-2 shadow-sm">
          <div className="mb-8">
            <span className="text-[#6abd45] font-semibold text-lg uppercase tracking-wider">
              Growth & Learning
            </span>
            <h2 className="text-4xl font-bold text-black mt-2">
              Accelerate Your Career Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthPoints.map((gp, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {gp.question}
                  </h3>
                  <p className="text-gray-700 text-md leading-relaxed text-justify">
                    {gp.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. LIFE AT THE COMPANY SECTION */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            
            <h2 className="text-4xl font-bold text-black mt-2">
              What does working here actually feel like?
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="bg-white border-2 shadow-md rounded-3xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={hl.image}
                    alt={hl.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {hl.badge}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {hl.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">
                      {hl.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. OPPORTUNITIES & CAREERS CTA SECTION */}
        <section className="bg-gray-50 rounded-3xl p-10 text-black shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <span className="text-[#6abd45] font-semibold text-sm uppercase tracking-widest">
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              What roles are available?
            </h2>
            <p className="text-gray-700 text-md leading-relaxed">
              We are constantly seeking talented Structural Detailers, Connection Designers, BIM Engineers, Estimators, and Trainees to join our growing team.
            </p>
          </div>

          <div>
            <Link
              to="/career#current-openings"
              className="inline-flex items-center gap-2 bg-[#6abd45] hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Explore Open Positions in Careers →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default LifeAtwbt;
