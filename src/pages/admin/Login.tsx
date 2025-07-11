import { useEffect, useState } from 'react'
import { HeaderBase } from '../../components/header/Header'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../config/auth';

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login | Admin - Whiteboard"
    })

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            AuthService.login({ username, password })
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <>
      <HeaderBase />
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="flex flex-col items-center flex-wrap bg-[#6abd45] rounded-2xl m-3 p-5 border-4 border-white shadow-lg drop-shadow-lg h-fit w-full md:w-1/3 sm:w-fit lg:max-w-screen-sm">
          <div
            className="items-center text-2xl font-bold text-white uppercase"
            style={{ textShadow: "5px 5px 20px rgb(0,0,0)" }}
          >
            Login
          </div>
          <form className="flex flex-col w-full my-2">
            <div className="flex flex-col my-2">
              <label className="font-semibold text-white" htmlFor="email">
                Email
              </label>
              <input
                className="mb-2 mt-1 px-1 w-full py-1.5 bg-transparent placeholder-opacity-70 appearance-none focus:outline-none leading-tight placeholder-white border-b-2 text-white"
                placeholder="Enter UserName"
                name="username"
                id="text"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="font-semibold text-white" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-1 py-0 mt-1 mb-2 leading-loose text-white placeholder-white bg-transparent border-b-2 appearance-none placeholder-opacity-70 focus:outline-none"
                placeholder="Enter Password"
                name="password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-row items-center">
              <button
                className="bg-white m-2 py-1.5 px-3 rounded-xl shadow-lg drop-shadow-lg hover:shadow-none hover:drop-shadow-none text-[#6abd45] font-semibold hover:bg-[#6abd45] border-2 hover:border-white hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login