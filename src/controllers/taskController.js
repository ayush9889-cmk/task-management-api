import Task from "../models/Task.js";

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, page = 1, limit = 10 } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Math.max(Number(limit), 1), 100);
    const skip = (pageNumber - 1) * limitNumber;

    const [tasks, totalTasks] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNumber),

      Task.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          currentPage: pageNumber,
          limit: limitNumber,
          totalTasks,
          totalPages: Math.ceil(totalTasks / limitNumber),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
