/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import AddTodo from "@/components/AddTodo"
import Redirect from "@/components/Redirect"
import TodoCard from "@/components/TodoCard"
import TopBar from "@/components/TopBar"
import { getTodosByCategory } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

export default function TodosByCategory() {
    const router = useRouter()
    const { category } = router.query 

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const { isLoaded, userId, getToken } = useAuth()

    const fetchData = useCallback(async () => {
        if (!userId) return
        if (!loading) return
        const token = await getToken({ template: 'codehooks' })
        const data = await getTodosByCategory(token, userId, category)
        // update state -- configured earlier.
        setTodos(data);
        setLoading(false);
      }, [getToken, userId, category, loading])

    useEffect(() => {
        async function firstLoad() {
            fetchData()
        }
        firstLoad()
    }, [fetchData])

    if (!isLoaded || !userId) {
        // You can handle the loading or signed state separately
        return <Redirect location='/'></Redirect>
    }

    const todosArray = []
    for (const todo of todos) {
        todosArray.push(<TodoCard item={todo.item} done={todo.done} id={todo._id}></TodoCard>)
    }

    return (<>
        <TopBar navUrl='/todos' navName='View full todo list' title={`Category: ${category}`}></TopBar>
        <AddTodo setLoading={setLoading} category={category}></AddTodo>
        <Link href={`/done/${category}`}>View Completed items in {category}</Link>
        <div
            css={css`
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-evenly;
            `}
        >
            {todosArray}
        </div>
    </>)
}