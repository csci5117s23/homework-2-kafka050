import TodoCard from "@/components/TodoCard"
import { useAuth, UserButton } from "@clerk/nextjs"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Redirect from "@/components/Redirect"
import TopBar from "@/components/TopBar"
export default function Todos() {
    // GET ALL TODO ITEMS FROM DB
    // THEN REPLACE CURRENT TODOCARDS WITH THOSE  
    const { getToken, isLoaded, isSignedIn } = useAuth();
  
    if (!isLoaded || !isSignedIn) {
        // You can handle the loading or signed state separately
        return <Redirect location='/'></Redirect>
    }

    return (<>
        <TopBar title='Your Todo List'></TopBar>
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
    </>)
}