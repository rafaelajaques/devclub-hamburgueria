const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3001
app.use(express.json())

const orders = []

app.post('/order', (request, response) => {
    const { order, clientName, price } = request.body
    let client = { id: uuid.v4(), order, clientName, price }

    orders.push(client)

    const currentClient = orders.map((client) => {

        const current = {
            id: client.id,
            order: client.order,
            clientName: client.clientName,
            price: client.price,
            status: 'Em preparação'
        }
        return current
    })

    // client = currentClient

    return response.status(201).json(currentClient)
})

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.put('/order/:id', (request, response) => {

    const { id } = request.params
    const { order, clientName, price } = request.body
    const updateClient = { id, order, clientName, price }
    const index = orders.findIndex(client =>
        client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Client not founded" })
    }
    orders[index] = updateClient

    return response.json(updateClient)
})

app.delete('/order/:id', (request, response) => {

    const { id } = request.params
    const index = orders.findIndex(client =>
        client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Client not founded" })
    }
    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) => {

    const { id } = request.params
    const { order, clientName, price } = request.body
    const client = { id, order, clientName, price, }

    const index = orders.findIndex(client =>
        client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Client not founded" })
    }

    orders[index] = client

    return response.json(client)
})

app.patch('/order/:id', (request, response) => {

    const { id } = request.params
    const { order, clientName, price } = request.body
    const client = { id, order, clientName, price, }

    const currentClient = orders.map((client) => {

        const current = {
            id: client.id,
            order: client.order,
            clientName: client.clientName,
            price: client.price,
            status: 'Pronto'
        }
        return current
    })

    const index = orders.findIndex(client =>
        client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Client not founded" })
    }

    orders[index] = client

    return response.json(currentClient)
})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})