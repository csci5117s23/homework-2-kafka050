/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Link from "next/link"
import DoneButton from "./DoneButton"

export default function TodoCard(props) {
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
            <Link href={'/todos/'+props.id}>
                <h2>{props.item.length > 20 ? props.item.slice(0, 20) : props.item}</h2>
            </Link>
            <DoneButton id={props.id} done={props.done} ></DoneButton>
        </div>
    )
    
}

