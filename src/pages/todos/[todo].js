import TodoCard from "@/components/TodoCard"
import TopBar from "@/components/TopBar";
import { getTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Home from "..";
import Redirect from "@/components/Redirect";
import FullTodoItem from "@/components/FullTodoItem";


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

      if (!isLoaded || !userId) {
        // You can handle the loading or signed state separately
        return <Redirect location='/'></Redirect>
    }
    if (todoItem) {
        return (
            <>
                <TopBar title='Your Todo List'></TopBar>
                <FullTodoItem item={todoItem.item} done={todoItem.done} editing={true} id={todo}></FullTodoItem>
                <Link href='/todos'>View All Items</Link>
            </>
        )
    } else {
        return <p>That item does not exist</p>
    }
}