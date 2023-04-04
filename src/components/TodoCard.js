import { useState } from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import StatusControls from "./StatusControls"
import Link from "next/link"

export default function TodoCard(props) {
    const [title, setTitle] = useState(props.title)
    const [status, setStatus] = useState(props.status)
    const [content, setContent] = useState(props.content)
    const editing = props.editing
    const id = props.id
    if (editing) {
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
                    <label htmlFor="todoTitle">Item Title: </label>
                    <input type='text' id='todoTitle' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='todoContent'>Item content: </label>
                    <textarea id='todoContent' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <StatusControls status={status} setStatus={setStatus}></StatusControls>
            </div>
        )
    } else {
        return (
            <div className="card"
                css={css`
                    display: flex;
                    flex-direction: column;
                    width: 20rem;
                    height: 10rem;
                    background-color: slategrey;
                    padding: 2rem;
                    margin: 2rem;
                    border-radius: 1rem;
                `}
            >
                <Link href={'/todos/'+id}>
                    <h2>{title}</h2>
                </Link>
                <p>{content}</p>
                <StatusControls status={status} setStatus={setStatus}></StatusControls>
            </div>
        )
    }
}

