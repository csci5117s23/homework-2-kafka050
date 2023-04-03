/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function StatusControls(props) {
    const status = props.status
    const setStatus = props.setStatus
    let controls
    if (status == 'Todo') {
        controls = (
            <>
                <Button setStatus={setStatus} newStatus='In Progress' />
                <Button setStatus={setStatus} newStatus='Done' />
            </>
        )
    } else if (status == 'In Progress') {
        controls = (
            <>
                <Button setStatus={setStatus} newStatus='Todo' />
                <Button setStatus={setStatus} newStatus='Done' />
            </>
        )
    } else {
        controls = (
            <>
                <Button setStatus={setStatus} newStatus='Todo' />
                <Button setStatus={setStatus} newStatus='In Progress' />
            </>
        )
    }

    return (
        <div css={css`
        
        `}
        >
            {controls}
        </div>
    )
}

function Button(props) {
    const setStatus = props.setStatus
    const newStatus = props.newStatus
    return <button onClick={() => setStatus(newStatus)}>Set as {newStatus}</button>
}
