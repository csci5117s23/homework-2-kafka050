import { useEffect } from "react";

export default function Redirect(props) {
    const loc = props.location
    useEffect(() => {
      const timeout = setTimeout(() => {
        // 👇️ redirects to an external URL
        window.location.replace(loc);
      }, 500);
  
      return () => clearTimeout(timeout);
    }, [loc]);
  
    return <></>;
}