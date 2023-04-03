import TodoCard from "@/components/TodoCard"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Todo() {
    const router = useRouter()
    const { todo } = router.query
    return (
    <>
        <TodoCard title='testy' status='Todo' content='Aiden' editing={true} id={todo}></TodoCard>
        <Link href='/todos'>View All Items</Link>
    </>
    )
}