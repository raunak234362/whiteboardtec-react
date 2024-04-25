import { RefObject, useEffect, useState } from "react";

const GoTop = ({props}:{props:RefObject<HTMLDivElement>}) => {
    const [scrollPosition, setSrollPosition] = useState(0);
    const [showGoTop, setshowGoTop] = useState(false);

    const handleVisibleButton = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    
        if (scrollPosition > 80) {
          return setshowGoTop(true);
        } else if (scrollPosition < 80) {
          return setshowGoTop(false);
        }
      };

      useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
      });

      const handleScrollUp = () => {
        props?.current?.scrollIntoView({ behavior: "smooth" });
      };



  return (
    <>
      <div className={`bg-[#6abd45] rounded-full fixed md:bottom-12 right-10 border-2 border-white p-2.5 m-2 cursor-pointer max-md:bottom-32 ${(showGoTop)? "":"hidden"}`} onClick={handleScrollUp}>
          <span>
            <svg
              fill="#fff"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z" />
            </svg>
          </span>
      </div>
    </>
  );
};
export default GoTop;
