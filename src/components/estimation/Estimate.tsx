import { Link } from 'react-router-dom'

function Estimate({ head }: { head: string }) {
    return (
        <>
            <div className="bg-[#6abd45] rounded-xl md:order-1 order-first p-4 mx-10 -mt-6 text-white">
                <div className="text-xl text-justify" style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}>{head}</div>
                <div className="m-5 ml-0 text-sm text-justify">
                    We will assess your projects absolutely free of cost and point out schedules that work best for your project's quick turnaround in no time at all!
                </div>
                <div className="text-sm my-2 mr-5 text-justify">
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
                                <span className="flex text-sm text-justify">Integrated Project Management</span>
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
                                <span className="flex text-sm text-justify">Insights on how to Optimize Schedules</span>
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
                                <span className="flex text-sm text-justify">Weekly, Quarterly, Progress & Assessments of Projects</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="mt-5 mb-0 flex flex-wrap flex-col md:flex-row items-center">
                    <Link
                        to="#"
                        className="border-2 rounded-full border-white border-opacity-90 duration-200 ease-in-out text-sm px-5 py-2 hover:bg-white hover:text-[#6abd45] hover:border-white hover:shadow-xl"
                    >
                        Get Estimate ➤
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Estimate