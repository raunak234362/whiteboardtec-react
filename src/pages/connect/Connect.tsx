import { useEffect } from "react";
import { PageBanner } from "../../components/banner";
import { Forms } from "../../components/forms/Forms";
import connectData from "../../data/connect.json";

function Connect({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Connect - Whiteboard";
  }, []);

  const data = previewData || connectData;
  const isEditMode = !!onSectionClick;

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    if (isEditMode && onSectionClick) {
      e.stopPropagation();
      e.preventDefault();
      onSectionClick(sectionId);
    }
  };

  const getEditClass = (_sectionId: string) => {
    return isEditMode
      ? "relative cursor-pointer hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200 rounded-md"
      : "";
  };

  return (
    <>
      <div
        className={getEditClass("banner")}
        onClick={(e) => handleClick(e, "banner")}
      >
        <PageBanner {...data.banner} />
      </div>

      <section className="rounded-3xl border-2 p-4 grid grid-cols-2 md:grid-cols-[62%_38%] gap-3 shadow-md mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl bg-white">
        <div className="order-1 pr-10 m-4 max-md:order-2">
          <div 
            className={`p-2 rounded ${getEditClass("intro")}`}
            onClick={(e) => handleClick(e, "intro")}
          >
            <div className="text-3xl font-bold my-2 text-[#6abd45]" dangerouslySetInnerHTML={{ __html: data.context.heading }} />
            <p className="text-lg leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: data.context.body }} />
          </div>

          <div 
            className={`flex flex-row flex-wrap justify-start mx-3 my-3 max-md:mx-0 p-2 rounded ${getEditClass("phones")}`}
            onClick={(e) => handleClick(e, "phones")}
          >
            {data.context.phone?.map((phone: any, index: number) => {
              return (
                <div key={index} className="flex flex-row items-center mr-5 py-2">
                  <span className="m-2 text-gray-700">
                    <svg
                      className="h-4 w-4 text-[#6abd45]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="text-gray-500">
                    <span className="flex text-lg font-medium">
                      <a href={`tel:${phone.primary}`} target="_blank" rel="noreferrer">
                        {phone.primary}
                      </a>
                    </span>
                    {phone.secondary && (
                      <span className="flex text-lg font-medium">
                        <a href={`tel:${phone.secondary}`} target="_blank" rel="noreferrer">
                          {phone.secondary}
                        </a>
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div 
            className={`flex flex-row flex-wrap items-center mx-3 my-3 max-md:mx-0 p-2 rounded ${getEditClass("mails")}`}
            onClick={(e) => handleClick(e, "mails")}
          >
            <span className="m-2 text-gray-700 max-md:m-1">
              <svg
                className="h-8 w-8 text-[#6abd45]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </span>
            <div className="flex flex-col items-start mr-5">
              {data.context.mail?.map((mail: any, index: number) => {
                return (
                  <span key={index} className="my-1 text-gray-500">
                    <span className="flex text-lg text-start font-medium">
                      <a href={`mailto:${mail.email}`} target="_blank" rel="noreferrer">
                        {mail.email}
                      </a>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div 
            className={`flex flex-col flex-wrap justify-start my-3 p-2 rounded ${getEditClass("addresses")}`}
            onClick={(e) => handleClick(e, "addresses")}
          >
            {data.context.address?.map((addr: any, index: number) => {
              return (
                <div key={index} className="flex flex-col my-4">
                  <span className="text-black">
                    <span className="flex text-3xl font-bold text-[#6abd45]" dangerouslySetInnerHTML={{ __html: addr.title }} />
                    {addr.addrLine1 && (
                      <span className="flex text-lg mt-1 font-medium">{addr.addrLine1}</span>
                    )}
                    {addr.addrLine2 && (
                      <span className="flex text-lg font-medium">{addr.addrLine2}</span>
                    )}
                    {addr.addrLine3 && (
                      <span className="flex text-lg font-medium">{addr.addrLine3}</span>
                    )}
                    {addr.phone && (
                      <span className="flex flex-row items-center text-sm mt-1">
                        <span className="mr-2 text-gray-700">
                          <svg
                            className="h-5 w-5 text-[#6abd45]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                        <span className="text-gray-500 font-medium text-lg">
                          <a href={`tel:${addr.phone}`} target="_blank" rel="noreferrer">
                            {addr.phone}
                          </a>
                        </span>
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-center order-2 mt-10 max-md:order-1">
          <Forms
            title={data.form?.title}
            field={data.form?.field}
          />
        </div>
      </section>
    </>
  );
}

export default Connect;
