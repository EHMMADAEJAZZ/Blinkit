import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const handleIsLogin=(value)=>{
        setIsLogin(value);
    }
  return (
    <div className="w-full min-h-[80dvh] sm:my-2 bg-inherit flex justify-center sm:justify-center sm:items-center">
        <div className=" w-full min-h-full  border max-w-lg rounded-lg border-gray-600 shadow-2xl shadow-gray-800 bg-gradient-to-t from-orange-400 to-indigo-600"> 

        <div  className="w-full flex justify-between rounded-lg text-white  ">

            <button onClick={()=>handleIsLogin(true)} className={`uppercase rounded-r-none rounded-lg bg-gray-100 w-1/2 p-2 ${isLogin ?"bg-gradient-to-tr from-rose-600 to-indigo-600":"bg-gradient-to-tr from-neutral-600 to-indigo-600"}`} >Login</button>
            <button className={`uppercase rounded-l-none rounded-lg bg-gray-100 w-1/2 p-2 ${isLogin ?"bg-gradient-to-tr from-neutral-600 to-indigo-600":"bg-gradient-to-tr from-rose-600 to-indigo-600"}`} onClick={()=>handleIsLogin(false)}>Register</button>
        </div>

        {
            isLogin? (
                <>
                <Login />
                </>
            ) : (
                <>
                <Register />
                
                </>
            )
        }
        </div>

    </div>
  )
}

export default Auth