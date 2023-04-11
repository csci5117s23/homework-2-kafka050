/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import DoneButton from "./DoneButton"
import { useState } from "react"
import { editTodo } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"

export default function FullTodoItem(props) {
    const [edited, setEdited] = useState(false)
    const [item, setItem] = useState(props.item)
    const todoId = props.id
    const { userId, getToken } = useAuth()
    async function applyChanges() {
        if (!userId) return
        const token = await getToken({ template: "codehooks" })
        editTodo(token, todoId, {item: item})
        setEdited(false)
    }
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
                <textarea type='text' id='todoItem' value={item} 
                    onChange={(e) => {
                        setItem(e.target.value)
                        setEdited(true)
                    }}
                ></textarea>
            </div>
            <div>
                <button id='apply' onClick={applyChanges}>{edited ? 'Apply Changes' : 'Changes Applied'}</button>
            </div>
            <DoneButton id={props.id} done={props.done} ></DoneButton>
        </div>
    )
}