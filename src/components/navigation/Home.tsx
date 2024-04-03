import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavRouteType } from ".";

function Home(props: NavRouteType): JSX.Element {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="inline">
        {props.image && (
          <>
            <NavLink to={props.path} className="relative inline-block"
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}>
              <div className="relative float-left bg-black">
                <img
                  src={props.image}
                  alt={props.name}
                  className={`w-[13.65rem] scale-${hovered? 105:100} ease-in-out duration-1000 opacity-${hovered? 30:100}`}
                />
                <div className={`absolute bottom-1/2 left-10 font-bold text-2xl text-white z-20 opacity-${hovered? '0':'1'}`} style={{ textShadow: '5px 5px 7px rgb(0, 0, 0)' }}>
                  {props.name}
                </div>
                <div className={`absolute top-0 left-0 w-full opacity-${hovered? 1: 0}`}>
                  <NavLink to={props.path}>
                  <div className="text-white bg-[#6abd45] text-center font-semibold text-xl">
                    {props.name}
                  </div>
                  </NavLink>
                  <ul>
                    {
                      props.child?.map((child) => (
                        <NavLink to={props.path + child.path}>
                          <li className="text-white text-left text-sm px-2 py-1">
                            {child.name}
                          </li>
                        </NavLink>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
