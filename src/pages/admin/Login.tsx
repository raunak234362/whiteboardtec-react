import { useEffect, useState } from 'react'
import { HeaderBase } from '../../components/header/Header'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login | Admin - Whiteboard"
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        .then (() => {
            navigate("/admin/dashboard");
        }).catch((error) => {
            if (error.code === "auth/invalid-credential"){
                alert("Invalid credentials");
            } else {
                alert("Login Failed\nError at Server Side");
            }
        })
    };

  return (
    <>
        <HeaderBase />
        <div className='flex flex-wrap justify-center items-center' style={{minHeight:"80vh"}}>
            <div className='flex flex-col items-center flex-wrap bg-[#6abd45] rounded-2xl m-3 p-5 border-4 border-white shadow-lg drop-shadow-lg h-fit w-full md:w-1/3'>
                <div className='items-center text-2xl font-bold text-white uppercase' style={{ textShadow: "5px 5px 20px rgb(0,0,0)" }}>
                    Login
                </div>
                <form className='my-2 flex flex-col w-full'>
                    <div className='flex flex-col my-2'>
                        <label className='text-white font-semibold' htmlFor='email'>Email</label>
                        <input className='mb-2 mt-1 px-1 w-full py-1.5 bg-transparent placeholder-opacity-70 appearance-none focus:outline-none leading-tight placeholder-white border-b-2 text-white'
                        placeholder='Enter Email' name='email' id='email' type='email' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='flex flex-col my-2'>
                        <label className='text-white font-semibold' htmlFor='password'>Password</label>
                        <input className='mb-2 mt-1 px-1 w-full py-0 bg-transparent placeholder-opacity-70 appearance-none focus:outline-none leading-loose placeholder-white border-b-2 text-white'
                         placeholder='Enter Password' name='password' id='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className='flex flex-row items-center'>
                        <button className='bg-white m-2 py-1.5 px-3 rounded-xl shadow-lg drop-shadow-lg hover:shadow-none hover:drop-shadow-none text-[#6abd45] font-semibold hover:bg-[#6abd45] border-2 hover:border-white hover:text-white'
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login