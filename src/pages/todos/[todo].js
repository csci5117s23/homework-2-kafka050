import TodoCard from "@/components/TodoCard"
import TopBar from "@/components/TopBar";
import { getTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Home from "..";


export default function Todo() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true)
    const [todoItem, setTodoItem] = useState(null)
    
    const router = useRouter()
    const { todo } = router.query
    useEffect(() => {
        const fetchData = async () => {
          if (!userId) return
          const token = await getToken({ template: 'codehooks' })
          const data = await getTodo(token, todo)
          // update state -- configured earlier.
          setTodoItem(data);
          setLoading(false);
        }
        fetchData();
      }, [getToken, userId, todo])
    if (todoItem) {
        return (
            <>
                <TopBar title='Your Todo List'></TopBar>
                <TodoCard item={todoItem.item} done={todoItem.done} editing={true} id={todo}></TodoCard>
                <Link href='/todos'>View All Items</Link>
            </>
        )
    } else {
        return <p>That item does not exist</p>
    }
}