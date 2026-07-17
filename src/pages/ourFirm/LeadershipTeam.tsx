import { PageBanner, BannerPropType } from "../../components/banner";
import { useEffect, useState } from "react";
import Service from "../../config/service";

const banner: BannerPropType = {
  header: "Leadership",
  subheader: "Team",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685611/banner-image/team-banner_p2bvys.jpg",
};

const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48cmVjdCB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nI2UyZThmMCcvPjxjaXJjbGUgY3g9JzUwJyBjeT0nMzUnIHI9JzE4JyBmaWxsPScjY2JkNWUxJy8+PHBhdGggZD0nTTE1IDg1YzAtMTggMTUtMzAgMzUtMzBzMzUgMTIgMzUgMzAnIGZpbGw9JyNjYmQ1ZTEnLz48L3N2Zz4=";

function LeadershipTeam() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Leadership Team - Whiteboard Tech";
    async function fetchLeaders() {
      try {
        const data = await Service.leadershipGet();
        setLeaders(data || []);
      } catch (error) {
        console.error("Error loading leadership data:", error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, []);

  const getThoughts = (leader: any): string[] => {
    if (leader.thoughts && Array.isArray(leader.thoughts)) {
      return leader.thoughts;
    }
    if (leader.bio) {
      return leader.bio
        .split("\n")
        .map((t: string) => t.trim())
        .filter((t: string) => t !== "");
    }
    return [];
  };

  const getImageUrl = (leader: any): string => {
    if (leader.profilePic) {
      let pic = leader.profilePic;
      
      // Handle stringified JSON arrays/objects
      if (typeof pic === "string" && pic.trim().startsWith("[")) {
        try {
          pic = JSON.parse(pic);
        } catch (e) {}
      } else if (typeof pic === "string" && pic.trim().startsWith("{")) {
        try {
          pic = JSON.parse(pic);
        } catch (e) {}
      }

      // If it is an array, take the first item
      if (Array.isArray(pic)) {
        if (pic.length > 0) {
          pic = pic[0];
        } else {
          return leader.image || DEFAULT_AVATAR;
        }
      }

      if (typeof pic === "string") return pic;
      if (typeof pic === "object" && pic !== null) {
        return pic.secureUrl || pic.secure_url || pic.url || leader.image || DEFAULT_AVATAR;
      }
    }
    return leader.image || DEFAULT_AVATAR;
  };

  const formatUrl = (url: string): string => {
    if (!url) return "";
    const trimmed = url.trim();
    if (/^(f|ht)tps?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const getSocialLink = (leader: any): string => {
    if (leader.socialLinks) {
      let link = leader.socialLinks;
      
      // Handle stringified JSON
      if (typeof link === "string" && link.trim().startsWith("[")) {
        try {
          link = JSON.parse(link);
        } catch (e) {}
      } else if (typeof link === "string" && link.trim().startsWith("{")) {
        try {
          link = JSON.parse(link);
        } catch (e) {}
      }

      // If it is an array
      if (Array.isArray(link)) {
        if (link.length > 0) {
          link = link[0];
        } else {
          return "";
        }
      }

      if (typeof link === "string") return formatUrl(link);
      if (typeof link === "object" && link !== null) {
        const urlVal = (link as any).url || (link as any).link || (link as any).socialLinks || "";
        return formatUrl(urlVal);
      }
    }
    return "";
  };

  return (
    <>
      <PageBanner {...banner} />
      <div className="mx-auto my-3 lg:max-w-screen-lg xl:max-w-screen-xl font-sans">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600 text-lg font-medium">Loading Leadership Team...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Meet Our Leaders</h3>
            <p className="text-gray-500 max-w-md">No leadership profiles have been added yet. Please check back later or update the portal directory.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 p-2 mt-3 mb-10 gap-y-10 gap-x-10 md:grid-cols-2">
            {leaders.map((leader, index) => {
              const name = leader.name;
              const designation = leader.designation;
              const thoughts = getThoughts(leader);
              const imageUrl = getImageUrl(leader);
              const socialLink = getSocialLink(leader);
              return (
                <div
                  key={leader.id || leader._id || index}
                  className="bg-white border-2 shadow-lg rounded-none drop-shadow-lg p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-row items-start justify-between mb-4">
                      <div className="flex-1 mr-4">
                        <div className="text-[#6abd45] font-semibold text-4xl gap-2 flex flex-wrap flex-col">
                          {name}
                        </div>
                        <div className="font-semibold text-black text-xl mt-1 uppercase">
                          {designation}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={name}
                          className="h-44 w-36 object-cover rounded-none shadow-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = DEFAULT_AVATAR;
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-lg font-normal leading-relaxed text-justify text-gray-700">
                      {thoughts.map((thought, idx) => (
                        <p key={idx} className="my-2">
                          {thought}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mt-8 text-lg font-normal leading-relaxed text-justify text-gray-700">
                      <p className="my-2">Say Hello</p>
                    </div>
                    <div>
                      <span className="[&>svg]:h-10 [&>svg]:w-8 my-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (socialLink) {
                              window.open(socialLink, "_blank");
                            } else {
                              alert("No social link provided.");
                            }
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
                </div>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
}

export default LeadershipTeam;
