import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerPropType, PageBanner } from "../../components/banner";
import Service from "../../config/service";
import { getWhyUsImageUrl, getWhyUsImageUrls } from "../admin/whyUs/WhyUs";

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
  {
    title: "Continuous Learning & Growth",
    desc: "Regular training sessions, workshops, and mentorship programs designed to enhance your technical skills and accelerate career progression.",
    image: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685611/banner-image/team-banner_p2bvys.jpg",
    badge: "Growth",
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

const GroupedHighlightCard = ({
  cover,
  onOpenModal,
}: {
  cover: any;
  onOpenModal: () => void;
}) => {
  const coverImage = cover.images && cover.images.length > 0 ? cover.images[0] : cover.image;

  return (
    <div 
      className="bg-white border-2 shadow-md rounded-3xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={onOpenModal}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200 group">
        <img
          src={coverImage}
          alt={cover.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow z-10">
          {cover.badge}
        </span>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="text-white font-bold text-lg text-center px-4">
            View all {cover.badge} images
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-black mb-2">{cover.title}</h3>
          <div
            className="text-gray-700 text-sm leading-relaxed text-justify prose prose-sm max-w-none line-clamp-4"
            dangerouslySetInnerHTML={{ __html: cover.desc }}
          />
        </div>
      </div>
    </div>
  );
};

const PostCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[16/9] shadow-sm max-w-4xl mx-auto">
        <img 
          src={images[0]} 
          alt={title}
          className="w-full h-full object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => window.open(images[0], "_blank")}
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[16/9] shadow-sm max-w-4xl mx-auto group">
      <img 
        src={images[currentIdx]} 
        alt={`${title} - ${currentIdx + 1}`}
        className="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
        onClick={() => window.open(images[currentIdx], "_blank")}
      />
      
      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIdx((prev) => prev === 0 ? images.length - 1 : prev - 1); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIdx((prev) => prev === images.length - 1 ? 0 : prev + 1); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10 flex-wrap px-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIdx(i); }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIdx === i ? "bg-white scale-125 shadow-md" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
      
      {/* Counter */}
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-md">
        {currentIdx + 1} / {images.length}
      </div>
    </div>
  );
};

const LifeAtwbt = () => {
  const [cards, setCards] = useState<
    Array<{
      title: string;
      desc: string;
      image: string;
      images?: string[];
      badge: string;
    }>
  >([]);
  const [modalItems, setModalItems] = useState<typeof cards>([]);
  const [activePost, setActivePost] = useState<typeof cards[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (items: typeof cards) => {
    setModalItems(items);
    setActivePost(null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setActivePost(null);
  };

  useEffect(() => {
    document.title = "Life at WBT - Whiteboard";

    const loadCards = async () => {
      try {
        const data = await Service.whyUsPicGet();
        if (data && data.length > 0) {
          const sorted = data.slice().sort((a, b) => {
            const orderA = Number(a.order) || 0;
            const orderB = Number(b.order) || 0;
            return orderA - orderB;
          });
          setCards(
            sorted.map((item) => ({
              title: item.title,
              desc: item.description,
              badge: item.tag,
              image: getWhyUsImageUrl(item.image),
              images: getWhyUsImageUrls(item.image),
            }))
          );
        }
      } catch (err) {
        console.warn("Could not fetch dynamic Why Us cards, using fallback:", err);
      }
    };

    loadCards();
  }, []);

  const displayHighlights = cards.length > 0 ? cards : lifeHighlights;

  const groupedHighlights = displayHighlights.reduce((acc, curr) => {
    const badge = curr.badge || "Other";
    if (!acc[badge]) {
      acc[badge] = {
        cover: curr,
        items: [],
      };
    }
    acc[badge].items.push(curr);
    return acc;
  }, {} as Record<string, { cover: typeof displayHighlights[0]; items: typeof displayHighlights }>);

  const groupedCards = Object.values(groupedHighlights);

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
            <p className="text-lg text-gray-700 mt-2">
              We empower you to evolve from skilled technicians to industry-leading engineering consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthPoints.map((gp, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold text-[#6abd45] mb-2">
                  {gp.question}
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {gp.answer}
                </p>
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
            {groupedCards.map((group, idx) => (
              <GroupedHighlightCard 
                key={idx} 
                cover={group.cover} 
                onOpenModal={() => openModal(group.items)}
              />
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
              className="inline-flex items-center gap-2 bg-[#6abd45] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Explore Open Positions in Careers →
            </Link>
          </div>
        </section>

      </div>

      {/* Detailed Posts Modal */}
      {isModalOpen && modalItems.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative w-[90%] h-full flex flex-col bg-gray-100 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#6abd45]">
                {modalItems[0].badge} Highlights
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black hover:bg-gray-200 rounded-full p-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {activePost ? (
                <div className="flex flex-col h-full mx-auto w-full">
                  <button 
                    onClick={() => setActivePost(null)}
                    className="self-start mb-6 text-[#6abd45] hover:underline flex items-center gap-1 font-bold text-lg transition-all hover:-translate-x-1"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back to {modalItems[0]?.badge}
                  </button>
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 lg:items-start">
                    <div className="w-full lg:w-3/5 flex-shrink-0">
                      <PostCarousel images={activePost.images && activePost.images.length > 0 ? activePost.images : [activePost.image]} title={activePost.title} />
                    </div>
                    <div className="w-full lg:w-2/5 flex flex-col">
                      <h3 className="text-3xl font-bold text-black mb-6">{activePost.title}</h3>
                      <div 
                        className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed text-justify"
                        dangerouslySetInnerHTML={{ __html: activePost.desc }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modalItems.map((item, idx) => {
                    const coverImg = item.images && item.images.length > 0 ? item.images[0] : item.image;
                    return (
                      <div 
                        key={idx} 
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
                        onClick={() => setActivePost(item)}
                      >
                        <div className="relative h-56 overflow-hidden bg-gray-200">
                          <img src={coverImg} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <span className="text-white font-bold text-lg px-4 py-2 border-2 border-white rounded-full backdrop-blur-sm">View Post</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                          <div className="text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LifeAtwbt;
