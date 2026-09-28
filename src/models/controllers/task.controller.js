import { Task } from "../task.model.js";

const createTask = async(req, res) => {
    try {
        const{ title, description, status} = req.body;
        
        if(!title){
            return res.status(401).json({ message: "Title is required"});

        }

        const task = await Task.create({
            title,
            description,
            status,
            owner: req.user._id,
        });

        return res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    } catch (error){
        return res.status(201).json({ message: error.message });
    }
};

const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id});

        return res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks,
        });
    } catch (error){
        return res.status(500).json({ message: error.message});

    }
};

const updateTask = async(req,res) => {
    try {
        const {id} = req.params;
        const {title, description,status} = req.body;

        const task = await Task.findOne({ _id: id, owner: req.user._id});

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        await task.save();

        return res.status(200).json({ message : "Task updated successfully" , data: task});
    } catch (error) {
        return res.status(500).json({ message: error.message });

}
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { createTask, getTasks, updateTask, deleteTask };
