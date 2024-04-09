import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";
import WorkPortfolio from "./components/WorkPortfolio";
import { PortfolioPropType } from "../ourWork"
import { Dialog } from "@headlessui/react";
import { CarouselPropType } from "../../components/Carousel/CarouselDefault";

const portfolios: PortfolioPropType[] = [
  {
    title: "Structural Steel – Main Steel",
    description:
      "These are shop drawings supplied for main structural elements such as beams, columns, etc. For us, our portfolio is more than a collection. It’s work that has gone out and delivered results and created a lasting impact with the respective project. The very reason why clients keep coming back to us.",
    pdf: "https://www.whiteboardtec.com/projects/main-steel/WBT-Main-steel-sample.pdf",
    images: [
      {
        url: "/src/assets/image/insite-images/connection-design.png",
        alt: "Structural Steel 1",
      },
      {
        url: "/src/assets/image/insite-images/equal-opportunity.png",
        alt: "Structural Steel 2",
      },
      {
        url: "/src/assets/image/insite-images/our-services.jpg",
        alt: "Structural Steel 3",
      },
      {
        url: "/src/assets/image/insite-images/simplified.jpg",
        alt: "Structural Steel 4",
      },
    ],
  },
  {
    title: "Structural Steel – Miscellaneous Steel",
    description:
      "These are shop drawings of various miscellaneous steel elements such as gratings, handrails, trusses, ISO-Views and more.",
    pdf: "https://www.whiteboardtec.com/projects/misc-steel/WBT-Misc-steel-sample.pdf",
    images: [
      {
        url: "/src/assets/image/insite-images/connection-design.png",
        alt: "Structural Steel 1",
      },
      {
        url: "/src/assets/image/insite-images/equal-opportunity.png",
        alt: "Structural Steel 2",
      },
      {
        url: "/src/assets/image/insite-images/our-services.jpg",
        alt: "Structural Steel 3",
      },
      {
        url: "/src/assets/image/insite-images/simplified.jpg",
        alt: "Structural Steel 4",
      },
    ],
  },
];

function AdminPortfolio() {
  const [isOpen, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState("");
  const [images, setImages] = useState<CarouselPropType[]>([]);
  const [status, setStatus] = useState(false);


  const handleSubmit = () => {
    console.log(title, description, pdf, images, status);
  };

  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";
  });

  const header: HeaderProp = {
    head: "Portfolio",
  };

  if (auth.currentUser?.email) {
    return (
      <>
        <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-1 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Add New Portfolio
                </Dialog.Title>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <table className="mt-4 mx-10 border-separate border-spacing-y-4">
                <tr>
                  <td>
                    <label htmlFor="Role" className="text-sm text-gray-800">
                      Title
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Role"
                      id="Role"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Location" className="text-sm text-gray-800">
                      Description
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Description"
                      id="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full px-2"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="image" className="text-sm text-gray-800">
                      Images
                    </label>
                  </td>
                  <td >
                    {images?.map((_image, index) => (
                      <div key={index} className="ml-3 my-1">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={(e) => {
                            const newImages = [...images];
                            newImages[index] = {
                              ...newImages[index],
                              url: e.target.value,
                            };
                            setImages(newImages);
                          }}
                          className="border-2 border-gray-200 rounded-md mx-2 w-fit"
                        />
                        <button
                          type="button"
                          className="text-red-500 ml-2"
                          onClick={() => {
                            const filteredImages = images.filter(
                              (img, i) => i !== index
                            );
                            setImages(filteredImages);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-2 py-0.5 rounded-lg ml-10 mt-2"
                      onClick={() => {
                        const newImage = { url: "" };
                        setImages((prevImages) => [
                          ...(prevImages || []),
                          newImage,
                        ]);
                      }}
                    >
                      { (images?.length == 0)? "Add Images":"Add More Images" }
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="pdf" className="text-sm text-gray-800">
                      PDF
                    </label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="PDF"
                      id="PDF"
                      onChange={(e) => {
                        setPdf(e.target.value);
                      }}
                      className="border-2 border-gray-200 rounded-md mx-4 w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Active" className="text-sm text-gray-800">
                      Status
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Active"
                      id="Active"
                      checked={status}
                      onChange={() => setStatus(!status)}
                      className="border-2 border-gray-200 rounded-md mx-4 custom-checkbox"
                    />
                    {status ? (
                      <label className="text-[#6abd45]" htmlFor="Active">
                        Active
                      </label>
                    ) : (
                      <label className="text-red-600" htmlFor="Active">
                        Inactive
                      </label>
                    )}
                  </td>
                </tr>
              </table>
              <div className="flex flex-wrap justify-center flex-row">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className=" px-4 border-2 rounded-md bg-[#6abd45] text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Add New
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className=" px-4 border-2 rounded-md bg-slate-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-slate-600 hover:text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

        <section className="w-full grid grid-cols-[20%_80%]">
          <div style={{ minHeight: "95.2vh" }}>
            <Sidebar />
          </div>
          <div className="flex flex-col flex-wrap">
            <Header {...header} />
            <div className="flex flex-wrap flex-row m-4">
              <h1 className="text-lg font-semibold">
                List of Current Portfolio Works
              </h1>
              <button
                className="mx-4 px-2 border-2 rounded-md bg-gray-200 border-black hover:drop-shadow-none drop-shadow-xl shadow-xl hover:shadow-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Add New
              </button>
            </div>

            <table className="mx-4 divide-y divide-gray-200">
              <thead className="bg-[#6abd45] text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start pl-20 text-xs font-medium uppercase"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium  uppercase"
                  >
                    Portfolio PDF
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium  uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {portfolios?.map((portfolio, index) => (
                  <WorkPortfolio key={index} {...portfolio} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default AdminPortfolio