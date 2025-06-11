import { auth } from "../../../config/firebase"
import { HeaderProp } from "."
import { signOut } from "firebase/auth"
// import { useNavigate } from "react-router-dom"


function Header(prop: HeaderProp) {
    // const navigate = useNavigate();

    const handleLogOut = async() => {
        await signOut(auth)
        .then(()=> {
            alert("Logged Out Successfully");
            navigate("/admin");
        }).catch((error) => {
            alert(error.message);
        })
    }

return (
    <>
            <div className="w-full bg-gray-800 mt-0 px-3 py-1 items-center flex flex-wrap justify-between">
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