import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavRouteType } from ".";

function Home(props: NavRouteType): JSX.Element {
  const [hovered, setHovered] = useState(false);
  useEffect(()=> {
    document.title = "Whiteboard Technologies-Structural Steel Detailing|USA|Canada";
  });

  return (
    <>
      <NavLink
        to={props.path}
        className="md:inline md:w-fit md:h-full w-fit max-md:m-3"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <div className="relative md:inline-block max-md:overflow-hidden h-full max-md:flex">
          <div className="flex md:float-left flex-col max-md:flex-col md:bg-black overflow-hidden max-md:h-fit" >
            {props.image && (
              <img
                src={props.image}
                alt={props.name}
                className={`w-[23.5rem] max-md:w-screen max-md:h-[12rem] max-md:object-cover ease-in-out duration-1000 transform scale-${hovered? "105": "100"} ${hovered? "opacity-30": ""}`}
                style={{
                  scale: hovered? "1.2": "1",
                  transition: "all 1s ease-in-out",
                }}
              />
            )}
            <div
              className={`md:absolute flex uppercase flex-wrap items-center justify-center md:bottom-1/2 md:left-1/4 md:font-bold  md:text-3xl md:text-white z-20 ${hovered ? "invisible" : ""}`}
              style={{ textShadow: "5px 5px 7px rgb(0, 0, 0)" }}
            >
              {props.name}
            </div>
            <div
              className={`absolute top-0 left-0 w-full max-md:hidden ${
                hovered ? "" : "invisible"
              }`}
            >
              <NavLink to={props.path}>
                <div className="text-white bg-[#6abd45] text-start px-3 py-1 text-xl">
                  {props.name}
                </div>
              </NavLink>
              <ul>
                {props.child?.map((child) => (
                  <NavLink key={child.name} to={props.path + child.path}>
                    <li className="text-white text-left text-md p-1 px-3 hover:text-[#6abd45]">
                      {child.name}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default Home;
