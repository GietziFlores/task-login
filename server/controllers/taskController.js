import Task from "../models/Task.js";

// @desc    Obtener todas las tareas (admin: todas, user: solo suyas)
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "name email").populate("assignee", "name email");
    } else {
      tasks = await Task.find({ $or: [{ user: req.user._id }, { assignee: req.user._id }] }).populate("user", "name email").populate("assignee", "name email");
    }
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// @desc    Obtener tarea por ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Verificar permisos
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// @desc    Crear tarea
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, assignee } = req.body;

    const taskData = {
      title,
      description,
      user: req.user._id,
    };

    // Si es admin y proporciona assignee, asignarlo
    if (req.user.role === "admin" && assignee) {
      taskData.assignee = assignee;
    }

    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// @desc    Actualizar tarea
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Verificar permisos
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString() &&
      task.assignee?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const updateData = { ...req.body };

    // Solo admin puede cambiar assignee
    if (req.user.role !== "admin") {
      delete updateData.assignee;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// @desc    Eliminar tarea
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Verificar permisos
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString() &&
      task.assignee?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
