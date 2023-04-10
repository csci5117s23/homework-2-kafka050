import { useState } from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { editTodo } from "@/modules/Data"

export default function TodoCard(props) {
    const [edited, setEdited] = useState(false)
    const [item, setItem] = useState(props.item)
    const [done, setDone] = useState(props.done)
    const editing = props.editing
    const todoId = props.id
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    async function applyChanges() {
        if (!userId) return
        const token = await getToken({ template: "codehooks" })
        editTodo(token, todoId, {item: item})
        setEdited(false)
    }

    async function changeIfDone() {
        if (!userId) return
        const token = await getToken({ template: 'codehooks' })
        editTodo(token, todoId, {done: !done})
        setDone(!done)
    }
    if (editing) {
        console.log('item: ' + item)
        return (
            <div className="fullTodoItem"
                css={css`
                    display: flex;
                    flex-direction: column;
                    width: 50%;
                    background-color: slategrey;
                    padding: 2rem;
                    margin: 2rem;
                    border-radius: 1rem;
                `}
            >
                <div>
                    <label htmlFor="todoItem">Item: </label>
                    <input type='text' id='todoItem' value={item} 
                        onChange={(e) => {
                            setItem(e.target.value)
                            setEdited(true)
                        }}
                    ></input>
                </div>
                <div>
                    <button id='apply' onClick={applyChanges}>{edited ? 'Apply Changes' : 'Changes Applied'}</button>
                </div>
                <button onClick={changeIfDone}>Set as {done ? 'Todo' : 'Done'}</button>
            </div>
        )
    } else {
        return (
            <div className="card"
                css={css`
                    display: flex;
                    flex-direction: column;
                    width: 20rem;
                    height: 7.5rem;
                    background-color: slategrey;
                    padding: 2rem;
                    margin: 2rem;
                    border-radius: 1rem;
                `}
            >
                <Link href={'/todos/'+todoId}>
                    <h2>{item}</h2>
                </Link>
                <button onClick={()=>setDone(!done)}>Set as {done ? 'Todo' : 'Done'}</button>
            </div>
        )
    }
}

