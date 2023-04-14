/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { addTodo } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"

export default function AddTodo(props) {
    const { userId, getToken } = useAuth()
    async function newTodo() {
        const token = await getToken({ template: 'codehooks' })
        const newItem = document.getElementById('newTodo').value
        const todo = {
            userId: userId,
            item: newItem,
            category: props.category
        }
        await addTodo(token, todo)
        props.setLoading(true)
    }
    return (
        <div
            css={css`
            
            `}
        >
            <label htmlFor="newTodo">Add a todo item: </label>
            <input type='text' id='newTodo'></input>
            <button onClick={newTodo}>Add</button>
        </div>
    )
}