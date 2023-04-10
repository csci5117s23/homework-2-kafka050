
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import crudlify from 'codehooks-crudlify'
import {app, Datastore} from 'codehooks-js'
import { boolean, date, object, string } from 'yup';

// Use Crudlify to create a REST API for any collection
const todoYup = object({
    userId: string().required(),
    item: string().required().default('Todo Item'),
    done: boolean().required().default(false),
    category: string(),
    createdOn: date().default(() => new Date()),
})
crudlify(app, {todos: todoYup})

// bind to serverless runtime
export default app.init()

/*app.get('/todoItems/:userId/', async (req, res) => {
    const db = await Datastore.open()
    const {userId} = req.params
    res.json(JSON.parse(await db.get(userId)))
})
app.post('/todoItems/:userId/', async (req, res) => {
    const db = await Datastore.open()
    const {userId} = req.params
    let todoArray = JSON.parse(await db.get(userId))
    if (!todoArray) {
        todoArray = []
    }
    todoArray.push(req.body)
    await db.set(userId, todoArray)
    res.status(200)
})*/

