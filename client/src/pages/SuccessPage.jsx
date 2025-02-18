import { Link, useLocation } from "react-router-dom"

const SuccessPage = () => {
    const location = useLocation();
  return (
    <section className="w-full p-1">

        <div className="w-full max-w-md rounded p-4 bg-green-200 mx-auto flex flex-col items-center justify-center gap-5">
            <p className="text-green-800 font-bold text-lg text-center capitalize tracking-widest">{location?.state?.text ? location?.state?.text:'Payment'} successfull</p>
          <Link to='/' className="w-fit rounded px-5 py-1 text-green-900 border border-green-800 text-sm font-semibold hover:bg-green-900 hover:text-white transition-all duration-300">Go To Home</Link>
        </div>
    </section>
  )
}

export default SuccessPage