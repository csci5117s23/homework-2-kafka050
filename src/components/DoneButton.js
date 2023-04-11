import { editTodo } from "@/modules/Data"
import { useAuth } from "@clerk/nextjs"
import { useState } from "react"

export default function DoneButton(props) {
    const { userId, getToken } = useAuth()
    const [done, setDone] = useState(props.done)

    async function changeIfDone() {
        if (!userId) return
        const token = await getToken({ template: 'codehooks' })
        editTodo(token, props.id, {done: !done})
        setDone(!done)
    }
    return <button onClick={changeIfDone}>Set as {done ? 'Todo' : 'Done'}</button>
}

