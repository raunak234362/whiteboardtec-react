import { Link } from 'react-router-dom';

interface EstimateProps {
  head: string;
  body?: string;
  bullets?: string[];
}

function Estimate({ 
  head, 
  body = "We will assess your projects absolutely free of cost and point out schedules that work best for your project's quick turnaround in no time at all!", 
  bullets = [
    "Integrated Project Management",
    "Insights on how to Optimize Schedules",
    "Weekly, Quarterly, Progress & Assessments of Projects"
  ] 
}: EstimateProps) {
  return (
    <>
      <div className="bg-[#6abd45] rounded-xl md:order-1 order-first p-4 mx-5 text-white w-full">
        <div className="text-2xl font-bold">{head}</div>
        <div className="m-5 ml-0 text-md text-justify leading-relaxed">
          {body}
        </div>
        <div className="text-md my-2 mr-5 text-justify">
          <ul className="list-none list-inside space-y-2">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1">
                  <svg
                    className="h-4 w-4 text-white shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                </span>
                <span className="text-md">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 mb-0 flex flex-wrap flex-col md:flex-row items-center">
          <Link
            to="mailto:sales@whiteboardtec.com"
            className="border-2 rounded-full border-white border-opacity-90 duration-200 ease-in-out text-md px-5 py-2 hover:bg-white hover:text-[#6abd45] hover:border-white hover:shadow-xl font-semibold"
          >
            Get Estimate ➤
          </Link>
        </div>
      </div>
    </>
  );
}

export default Estimate;