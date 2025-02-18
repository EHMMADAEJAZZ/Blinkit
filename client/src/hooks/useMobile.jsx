import { useEffect, useState } from "react"

export const useMobile =(breakpoints=640)=>{
    const [isMobile, setIsMobile] = useState(false);
    
    const handleResize = () => {
        const checkPoint = window.innerWidth <= breakpoints
        setIsMobile(checkPoint);

    };
    useEffect(()=>{
        setIsMobile( window.innerWidth <= breakpoints)
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[])
    return isMobile;
}