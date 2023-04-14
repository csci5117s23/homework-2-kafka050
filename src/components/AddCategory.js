/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { addCategory, addTodo } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"

export default function AddCategory(props) {
    const { userId, getToken } = useAuth()
    async function newCategory() {
        const token = await getToken({ template: 'codehooks' })
        const newItem = document.getElementById('newCategory').value
        const category = {
            userId: userId,
            category: newItem
        }
        await addCategory(token, category)
        props.setLoading(true)
    }
    return (
        <div
            css={css`
            
            `}
        >
            <label htmlFor="newCategory">Add a category: </label>
            <input type='text' id='newCategory'></input>
            <button onClick={newCategory}>Add</button>
        </div>
    )
}