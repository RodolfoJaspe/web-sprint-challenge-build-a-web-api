// Write your "projects" router here!
const express = require("express")

const router = express.Router()

const Projects = require("./projects-model")
const { checkProjectId, checkProjectBody } = require("./projects-middleware")

router.get("/", (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
})

router.get("/:id", checkProjectId, async (req, res) => {
    try {
        const project = await Projects.get(req.params.id)
        res.status(200).json(project)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.post("/", checkProjectBody, async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        res.status(500).json(err)
    }

})

router.put("/:id", checkProjectId, checkProjectBody, async (req, res) => {
    try {
        const { id } = req.params
        const changes = req.body
        const editedProject = await Projects.update(id, changes)
        res.status(200).json(editedProject)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", checkProjectId, async (req, res) => {
    try {
        const { id } = req.params
        const deletedProject = await Projects.remove(id)
        res.status(200).json(deletedProject)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id/actions", checkProjectId, async (req, res) => {
    try {
        const project = await Projects.get(req.params.id)
        console.log(project.actions)
        res.status(200).json(project.actions)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router