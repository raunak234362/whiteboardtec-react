import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import { Forms, FormType } from "../../components/forms/Forms";

type PhoneType = {
  primary: string;
  secondary?: string;
};

type MailType = {
  email: string;
};

type AddressType = {
  title: string;
  addrLine1: string;
  addrLine2?: string;
  addrLine3?: string;
  phone?: string;
};

type ContextType = {
  heading: string;
  body: string;
  phone?: PhoneType[];
  mail?: MailType[];
  address?: AddressType[];
};

type DataType = {
  banner: BannerPropType;
  context: ContextType;
  form: FormType;
};

const data: DataType = {
  banner: {
    header: "Connect",
    subheader: "with us",
    image: "https://firebasestorage.googleapis.com/v0/b/whiteboard-website.appspot.com/o/assets%2Fimage%2Fbanner-image%2Fcontact-banner.jpg?alt=media&token=ba0feeb4-fb01-48d6-a89a-05eef618023a",
  },
  context: {
    heading: "We’d love to hear from you.",
    body: "You can contact us by filling out the form, and a member of our team will get back to you within 24 hours or less. Or, if you have an immediate need, you can also call us on your support line.",
    phone: [
      {
        primary: "1-612-605-5833",
        secondary: "1-218-212-7100",
      },
      {
        primary: "1-612-216-5427",
        secondary: "1-904-675-3009",
      },
    ],
    mail: [
      {
        email: "sales@whiteboardtec.com",
      },
      {
        email: "hr@whiteboardtec.com",
      },
    ],
    address: [
      {
        title: "USA",
        addrLine1: "#19904, 64th Avenue, Corcoran,",
        addrLine2: "MN 55340, USA",
      },
      {
        title: "INDIA",
        addrLine1: "No. 23/4, 1st Floor, Dr. Rajgopal Road, RMV 2nd Stage,",
        addrLine2: "Sanjaynagar, Bengalurur-560094, Karnataka, India",
        phone: "+91-6364063539",
      },
    ],
  },
  form: {
    title: "Fill the form below",
    field: [
      {
        name: "name",
        type: "text",
        placeholder: "Name",
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email",
      },
      {
        name: "phone",
        type: "text",
        placeholder: "Phone",
      },
      {
        name: "message",
        type: "textarea",
        placeholder: "Message",
      },
    ],
    submitMail: "sales@whiteboardtec.com",
  },
};

function Connect() {
  useEffect(() => {
    document.title = "Connect - Whiteboard";
  });

  return (
    <>
      <PageBanner {...data.banner} />
      <section className="rounded-3xl m-40 border-4 p-4 grid grid-cols-[62%_38%] gap-3 shadow-xl drop-shadow-xl mx-auto my-10 lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="m-4 pr-10">
          <div>
            <div className="text-3xl font-bold my-2 text-[#6abd45]">
              {data.context.heading}
            </div>
            <p className="text-justify text-lg leading-relaxed">
              {data.context.body}
            </p>
          </div>

          <div className="flex flex-wrap flex-row justify-start my-3 mx-3">
            {data.context.phone?.map((phone, index) => {
              return (
                <>
                  <div key={index} className="flex-row flex items-center mr-5">
                    <span className="text-gray-700 m-2">
                      <svg
                        className="h-8 w-8 text-[#6abd45]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span className="text-gray-500">
                      <span className="flex text-lg">
                        <a href={`tel:${phone.primary}`} target="_blank">
                          {phone.primary}
                        </a>
                      </span>
                      {phone.secondary && (
                        <span className="flex text-lg">
                          <a href={`tel:${phone.secondary}`} target="_blank">
                            {phone.secondary}
                          </a>
                        </span>
                      )}
                    </span>
                  </div>
                </>
              );
            })}
          </div>

          <div className="flex flex-wrap flex-row items-center my-3 mx-3">
            <span className="text-gray-700 m-2 ">
              <svg
                className="h-10 w-10 text-[#6abd45]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </span>
            <div className="flex-col flex items-start mr-5">
              {data.context.mail?.map((mail, index) => {
                return (
                  <>
                    <span key={index} className="text-gray-500 my-1">
                      <span className="flex text-lg text-start">
                        <a href={`mailto:${mail.email}`} target="_blank">
                          {mail.email}
                        </a>
                      </span>
                    </span>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap flex-col justify-start my-3">
            {data.context.address?.map((addr, index) => {
              return (
                <>
                  <div key={index} className="flex-col flex my-3">
                    <span className="text-black">
                      <span className="flex text-3xl font-bold">
                        {addr.title}
                      </span>
                      {addr.addrLine1 && (
                        <span className="flex text-lg">{addr.addrLine1}</span>
                      )}
                      {addr.addrLine2 && (
                        <span className="flex text-lg">{addr.addrLine2}</span>
                      )}
                      {addr.addrLine3 && (
                        <span className="flex text-lg">{addr.addrLine3}</span>
                      )}
                      {addr.phone && (
                        <span className="flex flex-row text-sm items-center">
                          <span className="text-gray-700 m-2">
                            <svg
                              className="h-8 w-8 text-[#6abd45]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {" "}
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </span>
                          <span className="text-gray-500">
                          <span className="flex items-center text-lg">
                            <a href={`tel:${addr.phone}`} target="_blank">
                              {addr.phone}
                            </a>
                          </span>
                        </span>
                        </span>
                      )}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <Forms
            title={data.form?.title}
            field={data.form?.field}
            submitMail={data.form?.submitMail}
          />
        </div>
      </section>
    </>
  );
}

export default Connect;
