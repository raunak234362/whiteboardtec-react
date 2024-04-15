import { useState } from "react";
import { PortfolioPropType } from "../../ourWork";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { storage, db } from "../../../config/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

function WorkPortfolio(props: PortfolioPropType) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [pdf, setPdf] = useState<any>(null);
  const [status, setStatus] = useState(props.status);

  const handleUpdate = async () => {
    // console.log(pdf);
    const data = {
      title: (props.title !== title) ? title : props.title,
      description: (props.description !== description) ? description : props.description,
      pdf: props.pdf,
      status: (props.status !== status) ? status : props.status,
    }

    if (pdf){
      const reference = ref(storage, props.pdf.split("?")[0]);
    await deleteObject(reference).then(() => {
      console.log("Old PDF Deleted");
    }).catch((err)=>[
      console.log(err)
    ])

    const pdfFile = ref(storage, `Portfolio/${title.replace(" ","_")}_${v4()}`);
    await uploadBytes(pdfFile, pdf).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        data.pdf = url;
        const portfolio = doc(db, "portfolio", props.id);
        updateDoc(portfolio, data);
      });
    })
    } else {
      const portfolioRef = doc(db, "portfolio", props.id);
      await updateDoc(portfolioRef, data)
    }

  }

  const handleDelete = async () => {
    const reference = ref(storage, props.pdf.split("?")[0]);
    await deleteObject(reference).then(() => {
      console.log("Old PDF Deleted");
    }).catch((err)=>[
      console.log(err)
    ])
    await deleteDoc(doc(db, "portfolio", props.id))
  };

  return (
    <>
      <Dialog
        open={isOpenJob}
        onClose={() => setOpenJob(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-1 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Edit Portfolio for {props.title}
                </Dialog.Title>
                <button
                  onClick={() => setOpenJob(false)}
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
                    <label htmlFor="pdf" className="text-sm text-gray-800">
                      PDF
                    </label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="PDF"
                      id="PDF"
                      accept="application/pdf"
                      onChange={async(e) => {
                        await setPdf(e.target.files?.[0]);
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
                    handleUpdate();
                  }}
                  className=" px-4 border-2 rounded-md bg-green-500 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-[#6abd45] hover:text-[#6abd45] hover:bg-white"
                >
                  Update
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className=" px-4 border-2 rounded-md bg-red-600 text-white text-lg border-white drop-shadow-lg mx-3 hover:border-red-600 hover:text-red-600 hover:bg-white"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setOpenJob(false);
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

      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
          {props.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 ">
          <Link
            to={props.pdf}
            target="_blank"
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            View PDF
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpenJob(true);
            }}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            More
          </button>
        </td>
      </tr>
    </>
  );
}

export default WorkPortfolio;
