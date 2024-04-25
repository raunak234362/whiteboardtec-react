import { NavLink } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { NavRouteType } from ".";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";

function Dropdown(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar(props: NavRouteType): JSX.Element {
  const [isactive, setActive] = useState(false);
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 768;

    setActive(isMobile());

    const handleResize = () => {
      setActive(isMobile());
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <Menu
        as="li"
        className="relative inline-block text-center "
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
      >
        <div className="max-md:border-b-[1px] max-md:border-gray-300">
          <Menu.Button className="md:inline-flex flex max-md:justify-between max-md:flex-wrap w-full md:justify-center justify-start gap-x-1.5 hover:bg-[#6abd45] px-3 py-2 text-md text-gray-900 mx-1 rounded-t-md ">
            <NavLink to={props.path}>{props.name}</NavLink>
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
          <Menu.Items
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
            className="md:absolute left-0 md:z-10 mt-0 w-56 max-md:w-full origin-top-right md:rounded-md bg-white md:shadow-lg md:ring-1 md:ring-black md:ring-opacity-5 focus:outline-none"
          >
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
                              ? "bg-gray-100 text-[#6abd45]"
                              : "text-gray-700",
                            "block md:px-4 py-2 text-sm  max-md:border-b-[1px] max-md:border-gray-300 text-left max-md:px-8"
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
