import TodoCard from "@/components/TodoCard"
import { getDone } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import TopBar from "@/components/TopBar"
import { useCallback, useState } from "react"
import Home from ".."
import Link from "next/link"
import Redirect from "@/components/Redirect"

export default function Done() {
    // GET ALL TODO ITEMS FROM DB
    // THEN REPLACE CURRENT TODOCARDS WITH THOSE  
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    const { isLoaded, userId, sessionId, getToken } = useAuth()
    // FOR TESTING BEFORE MAKING CREATE TODO ITEM FUNCTIONALITY

    const fetchData = useCallback(async () => {
        if (!userId) return
        const token = await getToken({ template: 'codehooks' })
        const data = await getDone(token, userId)
        // update state -- configured earlier.
        setTodos(data);
        setLoading(false);
      }, [getToken, userId])
    fetchData()

    if (!isLoaded || !userId) {
        // You can handle the loading or signed state separately
        return <Redirect location='/'></Redirect>
    }
    

    const todosArray = []
    for (const todo of todos) {
        todosArray.push(<TodoCard item={todo.item} done={todo.done} id={todo._id}></TodoCard>)
    }

    return (<>
        <TopBar navUrl='/todos' navName='View your todo list' title='Your Completed Items'></TopBar>
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