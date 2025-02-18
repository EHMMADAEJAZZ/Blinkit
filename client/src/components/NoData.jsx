import nodataimg from "../assets/no-data.jpg";
const NoData = ({label}) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div>
            <img src={nodataimg} 
            className="w-64 h-64 object-cover"
            alt="no-data-found" />
        </div>
        <p className="text-sm text-neutral-700 font-bold tracking-widest leading-6 underline underline-offset-2">{label ? label :' No Data'}</p>
    </div>
  )
}

export default NoData