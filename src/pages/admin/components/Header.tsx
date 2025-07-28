
import { HeaderProp } from "."


function Header(prop: HeaderProp) {

    const handleLogOut = async() => {
       
    }

return (
    <>
            <div className="flex flex-wrap items-center justify-between w-full px-3 py-1 mt-0 bg-gray-800">
                    <div className="text-2xl font-bold text-[#6abd45] mx-3">
                            {prop.head}
                    </div>
                    <button className="text-white mx-3 border-2 border-white hover:text-gray-800 hover:bg-white hover:border-[#6abd45] duration-100 text-md bg-[#6abd45] rounded-xl px-2 py-0.5 my-1 font-semibold"
                        onClick={(e) => {
                                e.preventDefault();
                                handleLogOut();
                    }}>
                            Log Out
                    </button>
            </div>
    </>
)
}

export default Header