const todoList = require("../models/todoList")

//to get all tasks added to the to-do list
exports.getAllTasks = async (req, res) => {
	try {
		let tasks = await todoList.find()
		if (tasks.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No tasks added"
			})
		}
		res.status(200).json({
			success: true,
			message: "Displaying all tasks",
			tasks,
            taskCount: tasks.length 
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message
		})
	}
}

//to add a task to the todolist
exports.addTask = async (req, res) => {
	try {
		let task = await req.body
		let added = await todoList.create(task)
		if (!added) {
			return res.status(400).json({
				success: false,
				message: "Task not added"
			})
		}
		return res.status(200).json({
			success: true,
			message: "Task added successfully",
			task: added
		})
	} catch (error) {
		res.send(500).json({
			success: false,
			message: "Internal server error",
			error: error.message
		})
	}
}

//to update an already created task
exports.updateTask = async (req, res) => {
	try {
		let id = { _id: req.params.id }
		let taskUpdate = await req.body
		let updated = await todoList.findOneAndUpdate(id, taskUpdate, { new: true })

		if (!updated)
			return res.status(400).json({
				success: false,
				message: "Task not updated"
			})

		return res.status(200).json({
			success: true,
			message: "Task updated successfully",
			task: taskUpdate
		})
	} catch (error) {
		res.send(500).json({
			success: false,
			message: "Internal server error",
			error: error.message
		})
	}
}

//to delete a created task
exports.deleteTask = async (req, res) => {
	try {
		let id = { _id: req.params.id }
		let deleted = await todoList.findOneAndDelete(id)
		if (!deleted)
			return res.status(400).json({
				success: false,
				message: "Task not deleted"
			})

		return res.status(200).json({
			success: true,
			message: "Task deleted successfully"
		})
	} catch (error) {
		res.send(500).json({
			success: false,
			message: "Internal server error",
			error: error.message
		})
	}
}
