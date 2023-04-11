/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function TopBar(props) {
    const title = props.title
    return (
        <div css={css`
            top: 0;
            height: 10%;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: slategray;
        `}>
            <Link 
                css={css`flex: 1; margin: auto; display: flex; justify-content: center;`} 
                href={props.navUrl}
            >{props.navName}
            </Link>
            <h2 
                css={css`flex: 1; margin: auto; display: flex; justify-content: center;`}
                >{title}
            </h2>
            <div 
                css={css`flex: 1; margin: auto; display: flex; justify-content: center;`}
            ><UserButton></UserButton>
            </div>
        </div>
    )
}