import Link from "next/link";
import { useEffect } from "react";

export default function Redirect(props) {
    useEffect(() => {
      const link = document.getElementById('link')
      link.click()
    }, []);
    
    return <Link href={props.location} id='link'></Link>;
}