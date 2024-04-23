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
        className="inline w-full h-full"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <div className="relative inline-block h-full">
          <div className="flex float-left bg-black">
            {props.image && (
              <img
                src={props.image}
                alt={props.name}
                className={`w-[25rem] h-1/2 ease-in-out duration-500 transform scale-${hovered? "105": "100"} ${hovered? "opacity-30": ""}`}
                style={{
                  scale: hovered? "1.2": "1",
                  transition: "all 1s ease-in-out",
                  zIndex: hovered? 0: 20,
                }}
              />
            )}
            <div
              className={`absolute uppercase bottom-1/2 left-1/4 font-bold text-3xl  text-white z-20 ${hovered ? "invisible" : ""}`}
              style={{ textShadow: "5px 5px 7px rgb(0, 0, 0)" }}
            >
              {props.name}
            </div>
            <div
              className={`absolute top-0 left-0 w-full ${
                hovered ? "" : "invisible"
              }`}
            >
              <NavLink to={props.path}>
                <div className="text-white bg-[#6abd45] text-center py-1 text-xl">
                  {props.name}
                </div>
              </NavLink>
              <ul>
                {props.child?.map((child) => (
                  <NavLink key={child.name} to={props.path + child.path}>
                    <li className="text-white text-left text-md p-1 px-2 hover:text-[#6abd45]">
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
