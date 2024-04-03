import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavRouteType } from ".";

function Home(props: NavRouteType): JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className="inline"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}>
        <div
          className="relative inline-block">
          <div className="relative float-left bg-black">
            {props.image && (
              <img
                src={props.image}
                alt={props.name}
                className={`w-[18rem] h-3/5 ease-in-out duration-500 transform scale-${hovered ? '105' : '100'} hover:opacity-${hovered ? '30':'100'}`}/>
            )}
            <div
              className={`absolute bottom-1/2 left-10 font-bold text-2xl  text-white z-20 ${hovered? "invisible":""}`}
              style={{ textShadow: "5px 5px 7px rgb(0, 0, 0)" }}
            >
              {props.name}
            </div>
            <div
              className={`absolute top-0 left-0 w-full ${hovered? "":"invisible"}`}
            >
              <NavLink to={props.path}>
                <div className="text-white bg-[#6abd45] text-center font-semibold text-xl">
                  {props.name}
                </div>
              </NavLink>
              <ul>
                {props.child?.map((child) => (
                  <NavLink key={child.name} to={props.path + child.path}>
                    <li className="text-white text-left text-sm p-1">
                      {child.name}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
