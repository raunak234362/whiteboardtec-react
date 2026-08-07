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
          const response :any = await AuthService.login({ username, password });
          console.log(response);
            const token = response?.data?.data;
            console.log(token);
          
          if (response?.status === 200) {
            sessionStorage.setItem("token",token)
            navigate("/admin/edit-our-firm");
            alert("login successful")
          }
          else if (response?.status === 401 || response?.status === 400) {
            alert("invalid credential")
            
          }
          else(response)
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <>
      <HeaderBase />
      <div
        className="flex flex-wrap items-center justify-center bg-gray-50"
        style={{ minHeight: "85vh" }}
      >
        <div className="flex flex-col items-center bg-white rounded-md p-8 border border-gray-200 shadow-md w-full max-w-md mx-4">
          <div className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6">
            LOGIN
          </div>
          <form className="flex flex-col w-full">
            <div className="flex flex-col mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1" htmlFor="email">
                Username
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6abd45] focus:border-[#6abd45] text-gray-900 text-sm"
                placeholder="Enter UserName"
                name="username"
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6abd45] focus:border-[#6abd45] text-gray-900 text-sm"
                placeholder="Enter Password"
                name="password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2.5 px-4 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm font-bold uppercase transition-all shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login