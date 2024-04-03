import { NavLink } from "react-router-dom";
import { NavRouteType } from ".";

function NavBar(props: NavRouteType) : JSX.Element {
  return (
    <>
          <li className="px-2">
            <div id="summary" className="hover:text-white hover:bg-[#6abd45] px-2 py-1">
              <NavLink to={props.path}>{props.name}</NavLink>
            </div>
            {
              props.child && (
                <div id="details" className="hidden hover:block z-10">
                  <ul>
                    {
                      props.child.map((child) => (
                        <li key={child.name}>
                          <NavLink to={props.path+child.path}>{child.name}</NavLink>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </li>
    </>
  );
}

export { NavBar };
