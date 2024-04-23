const newsletter= {
    description: [
      "Industry Insights",
      "Sample Mock-ups",
      "Relevant Sales Content for Bids & Projects",
    ],
    formMail: "sales@whiteboard.com",
  }

import {useId} from 'react'

function Newsletter() {
    const formId = useId();

    function handleSubmit(formData: FormData) {
      const email = formData.get("email");
      console.log(email);
    }
  return (
    <>
          <section className="m-28 mt-0 mb-5 p-2 flex flex-wrap justify-start items-start mx-auto lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="flex flex-wrap flex-col">
              <div className="text-3xl text-justify m-1 font-semibold text-[#6abd45]">
                Sign up for our newsletter to get exclusive access to
              </div>
              <div className="flex flex-wrap flex-row mx-5">
                <div>
                  {newsletter?.description?.map((item, index) => (
                    <div key={index} className="flex-row flex justify-start mr-2 my-2">
                      <span className="text-gray-700 m-1 mt-1">
                        <svg
                          className="h-4 w-4 text-[#6abd45]"
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
                      <span className="text-gray-500">
                        <span className="flex text-lg">{item}</span>
                      </span>
                    </div>
                  ))}
                </div>
                {
                  newsletter.formMail && (
                    <div className="flex flex-wrap flex-row ml-40 items-end mt-4 mb-2">
                      <form id={formId}>
                        <input type="email" required placeholder="Email Address" name="email"
                        className="border-2 border-opacity-40 rounded-md border-slate-900 placeholder-black placeholder-opacity-50 px-2 py-1 w-80"/>
                        <button type="submit"
                        className="px-2 py-1 mx-4 border-2  border-slate-900 border-opacity-40 rounded-md text-opacity-70 hover:bg-[#6abd45] hover:text-white hover:font-bold hover:border-white"
                        onClick={(e) => {
                          e.preventDefault();
                          const formData = new FormData(document.getElementById(formId) as HTMLFormElement);
                          handleSubmit(formData);
                        }}>
                          Sign Up
                        </button>
                      </form>
                    </div>
                  )
                }
              </div>

            </div>
        </section>
        </>
  )
}

export default Newsletter