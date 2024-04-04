import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { NavRouteType } from ".";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";

function Dropdown(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props: NavRouteType): JSX.Element {
  const [isactive, setActive] = useState(false);
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 hover:bg-[#6abd45] px-3 py-2 text-sm font-semibold text-gray-900 mx-1 rounded-t-md">
          <NavLink
            to={props.path}
            onMouseOver={()=>setActive(true)}
            onMouseOut={()=>setActive(false)}
          >
              {props.name}
          </NavLink>
            </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={isactive}
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

              {props.child && (
                <>
                <div className="py-1">
                  {props.child.map((child) => (
                    <Menu.Item key={child.name}>
                      {({ active }) => (
                        <NavLink
                          to={props.path + child.path}
                          className={Dropdown(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {child.name}
                        </NavLink>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                </>
              )}

          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export { NavBar };
