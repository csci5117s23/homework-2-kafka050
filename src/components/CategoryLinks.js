/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Link from "next/link";

export default function CategoryLinks(props) {

    const linkArr = []
    linkArr.push(<Link href={`/todos/General`}>{`General`}</Link>)
    
    for (const category of props.categories) {
        linkArr.push(<Link href={`/todos/${category.category}`}>{category.category}</Link>)
    }

    return (<>
        <h2>Categories:</h2>
        <div css={css`
            display: flex;
            flex-direction: column;
            a:hover {
                color: blue;
            }
        `}>
            {linkArr}
        </div>
    </>)
}