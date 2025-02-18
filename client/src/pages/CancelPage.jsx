import {  Link } from "react-router-dom"
const CancelPage = () => {
  return (
    <section className="w-full p-1">

        <div className="w-full max-w-md rounded p-4 bg-red-200 mx-auto flex flex-col items-center justify-center gap-5">
            <p className="text-red-800 font-semibold text-lg text-center capitalize tracking-widest">order canceled</p>
            <Link to='/' className="w-fit rounded px-5 py-1 text-red-900 border border-red-800 text-sm font-semibold hover:bg-red-900 hover:text-white transition-all duration-300">Go To Home</Link>
        </div>
    </section>
  )
}

export default CancelPage