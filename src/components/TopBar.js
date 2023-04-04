/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useAuth, UserButton } from "@clerk/nextjs";


export default function TopBar(props) {
    const title = props.title
    return (
        <div css={css`
            top: 0;
            height: 10%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: slategray;
        `}>
            <p css={css`
                margin: auto 2%;
            `}
            >{title}</p>
            <UserButton></UserButton>
        </div>
    )
}