import TodoCard from "@/components/TodoCard"
import { getTodos, addTodo } from "@/modules/Data"
import { useAuth, UserButton } from "@clerk/nextjs"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import TopBar from "@/components/TopBar"
import { useCallback, useEffect, useState } from "react"
import Redirect from "@/components/Redirect"
import AddTodo from "@/components/AddTodo"

export default function Todos() { 
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const { isLoaded, userId, getToken } = useAuth()

    const fetchData = useCallback(async () => {
        if (!userId) return
        const token = await getToken({ template: 'codehooks' })
        const data = await getTodos(token, userId)
        // update state -- configured earlier.
        setTodos(data);
        setLoading(false);
      }, [getToken, userId])

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
        <TopBar navUrl='/done' navName='View your completed todos' title='Your Todo List'></TopBar>
        <AddTodo setLoading={setLoading} category='General'></AddTodo>
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