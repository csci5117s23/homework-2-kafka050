const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const getTodos = async (authToken, userId) => {
    const result = await fetch(`${backend_base}/todos?userId=${userId}`, {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json()
}

export const getTodo = async (authToken, todoId) => {
    const result = await fetch(`${backend_base}/todos/${todoId}`, {
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json()
}

/**
 * 
 * @param {*} authToken jwt token from clerk
 * @param {Object} todo {userId, item, done?} json object
 * @returns 
 */
export const addTodo = async (authToken, todo) => {
    const result = await fetch(`${backend_base}/todos`, {
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return await result.json();
}

export const editTodo = async (authToken, todoId, newTodo) => {
    const result = await fetch(`${backend_base}/todos/${todoId}`, {
        'method': 'PATCH',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(newTodo)
    })
}
