const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("An error occurred while fetching users.")
    }
})

module.exports = router
