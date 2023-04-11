import Link from "next/link";

export default function notFound() {
    return (<>
        <h1>404 lol gotem</h1>
        <Link href="/todos">We have to go back</Link>
    </>)
}