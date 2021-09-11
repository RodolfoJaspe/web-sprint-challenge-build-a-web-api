// add middlewares here related to actions
const Actions = require("./actions-model")

const checkActionId = async (req, res, next) => {
    try {
        const { id } = req.params
        const action = await Actions.get(id)
        if (!action) {
            res.status(404).json(`action ${id} not found`)
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` })
    }
}

const checkActionBody = async (req, res, next) => {
    try {
        const action = req.body
        if (!action.project_id || !action.description || !action.notes) {
            res.status(400).json({ message: "project_name, description, and notes required" })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` })
    }
}

module.exports = { checkActionId, checkActionBody }