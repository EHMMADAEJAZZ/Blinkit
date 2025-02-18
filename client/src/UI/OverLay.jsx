
const OverLay = ({children}) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-neutral-800 z-50 bg-opacity-80 px-2 transition-none duration-500 backdrop-blur-sm">
        {children}
    </div>
  )
}

export default OverLay