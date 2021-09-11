// Write your "actions" router here!
const express = require("express")
const { checkActionId, checkActionBody } = require("./actions-middleware")
const router = express.Router()


const Actions = require("./actions-model")


router.get("/", (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
})

router.get("/:id", checkActionId, async (req, res) => {
    try {
        const { id } = req.params
        const action = await Actions.get(id)
        res.status(200).json(action)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", checkActionBody, async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", checkActionBody, checkActionId, async (req, res) => {
    try {
        const { id } = req.params
        const changes = req.body
        const editedAction = await Actions.update(id, changes)
        res.status(200).json(editedAction)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", checkActionId, async (req, res) => {
    try {
        const { id } = req.params
        const deletedAction = await Actions.remove(id)
        res.status(200).json(deletedAction)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router