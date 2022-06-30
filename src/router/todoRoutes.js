const router = require("express").Router()
const controller = require("../controller/todoController")

router
.get("/", controller.getAllTasks)
.post("/", controller.addTask)
.put("/:id", controller.updateTask)
.delete("/:id", controller.deleteTask)

module.exports = router
