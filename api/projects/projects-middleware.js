// add middlewares here related to projects
const Projects = require("./projects-model")

const checkProjectId = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Projects.get(id)
        if (!project) {
            res.status(404).json(`project ${id} not found`)
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` })
    }
}

const checkProjectBody = async (req, res, next) => {
    try {
        const project = req.body
        if (!project.name || !project.description) {
            res.status(400).json({ message: "Name and description required" })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}` })
    }
}

module.exports = { checkProjectId, checkProjectBody }