/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import DoneButton from "./DoneButton"
import { useEffect, useState } from "react"
import { editTodo, getCategories } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"

export default function FullTodoItem(props) {
    const [loading, setLoading] = useState(true)
    const [edited, setEdited] = useState(false)
    const [item, setItem] = useState(props.item)
    const [category, setCategory] = useState(props.category)
    const [categories, setCategories] = useState([])
    const todoId = props.id
    const { userId, getToken } = useAuth()
    async function applyChanges() {
        if (!userId) return
        const token = await getToken({ template: "codehooks" })
        editTodo(token, todoId, {item: item, category: category})
        setEdited(false)
    }
    useEffect(() => {
        if (!loading) return
        async function loadCategories() {
            if (!userId) return
            const token = await getToken({ template: "codehooks" })
            const dataCategories = await getCategories(token, userId)
            setCategories(dataCategories)
            setLoading(false)
        }
        loadCategories()
    })
    const categoryChoices = []
    if (category == 'General') 
        categoryChoices.push(<option key='General' value={'General'} selected>General</option>)
    else 
        categoryChoices.push(<option key='General' value={'General'}>General</option>)

    for (const cat of categories) {
        if (cat.category == category)
            categoryChoices.push(<option key={cat.category} value={cat.category} selected>{cat.category}</option>)
        else
            categoryChoices.push(<option key={cat.category} value={cat.category}>{cat.category}</option>)
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
                <label htmlFor='todoCategory'>Category: </label>
                <select name='todoCategory' id='todoCategory' 
                    onChange={(e) => {
                        setCategory(e.target.value)
                        setEdited(true)
                    }}>
                    {categoryChoices}
                </select>
            </div>
            <div>
                <button id='apply' onClick={applyChanges}>{edited ? 'Apply Changes' : 'Changes Applied'}</button>
            </div>
            <DoneButton id={props.id} done={props.done} ></DoneButton>
        </div>
    )
}