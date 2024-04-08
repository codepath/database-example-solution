const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET: Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send("An error occurred while fetching users.")
    }
})

// POST: Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body,
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(500).send("An error occurred while creating the user.")
    }
})

// PUT: Update an existing user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: req.body,
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send("An error occurred while updating the user.")
    }
})

// DELETE: Delete an existing user by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        })

        res.status(204).send("User deleted successfully.")
    } catch (error) {
        res.status(500).send("An error occurred while deleting the user.")
    }
})

module.exports = router
