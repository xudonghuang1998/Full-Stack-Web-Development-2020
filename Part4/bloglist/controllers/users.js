const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs',{ author: 1, title: 1, url:1, likes:1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.username || !body.password)
        response.status(400).json({ error: 'Miss username/password!' })

    if(body.username.length <3 || body.password.length <3)
        response.status(400).json({ error: 'Minimum length of username/password is 3' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter