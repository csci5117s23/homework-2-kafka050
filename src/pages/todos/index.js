import TodoCard from "@/components/TodoCard"
import { getTodos, addTodo } from "@/modules/Data"
import { useAuth, UserButton } from "@clerk/nextjs"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import TopBar from "@/components/TopBar"
import { useCallback, useEffect, useState } from "react"
import Home from ".."

export default function Todos() {
    // GET ALL TODO ITEMS FROM DB
    // THEN REPLACE CURRENT TODOCARDS WITH THOSE  
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    const { isLoaded, userId, sessionId, getToken } = useAuth()
    // FOR TESTING BEFORE MAKING CREATE TODO ITEM FUNCTIONALITY

    const fetchData = useCallback(async () => {
        if (!userId) return
        const token = await getToken({ template: 'codehooks' })
        const data = await getTodos(token, userId)
        // update state -- configured earlier.
        setTodos(data);
        setLoading(false);
      }, [getToken, userId])
    fetchData()

    if (!isLoaded || !userId) {
        // You can handle the loading or signed state separately
        return <Home></Home>
    }
    

    const todosArray = []
    console.log(todos)
    for (const todo of todos) {
        todosArray.push(<TodoCard item={todo.item} done={todo.done} id={todo._id}></TodoCard>)
    }

    async function newTodo() {
        const token = await getToken({ template: 'codehooks' })
        const newItem = document.getElementById('newTodo').value
        const todo = {
            userId: userId,
            item: newItem
        }
        await addTodo(token, todo)
        fetchData()
    }

    return (<>
        <TopBar title='Your Todo List'></TopBar>
        <div
            css={css`
            
            `}
        >
            <label htmlFor="newTodo">Add a todo item: </label>
            <input type='text' id='newTodo'></input>
            <button onClick={newTodo}>Add</button>
        </div>
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