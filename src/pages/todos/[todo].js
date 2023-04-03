import { useRouter } from "next/router"

export default function Todo() {
    const router = useRouter()
    const { todo } = router.query
    return (
        <h1>Todo page {todo} </h1>
    )
}