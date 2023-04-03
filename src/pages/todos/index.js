import TodoCard from "@/components/TodoCard"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
export default function todos() {
    // GET ALL TODO ITEMS FROM DB
    // THEN REPLACE CURRENT TODOCARDS WITH THOSE

    return (
        <div
            css={css`
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-evenly;
            `}
        >
            <TodoCard title='testy' status='Todo' content='Aiden' id='1'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='2'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='3'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='4'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='5'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='6'></TodoCard>
            <TodoCard title='testy' status='Todo' content='Aiden' id='7'></TodoCard>
        </div>
    )
}