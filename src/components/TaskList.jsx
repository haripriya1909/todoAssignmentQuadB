import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = () => {
  const { tasks, updateTasks } = useOutletContext();
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, starred: false },
      ];
      updateTasks(updatedTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  const handleToggleStar = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, starred: !task.starred } : task
    );
    updateTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? editingTask : task
    );
    updateTasks(updatedTasks);
    setEditDialogOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    updateTasks(updatedTasks);
    setEditDialogOpen(false);
  };

  const activeTasks = [...tasks]
    .filter((task) => !task.completed)
    .sort((a, b) => (a.starred === b.starred ? 0 : a.starred ? -1 : 1));
  const completedTasks = [...tasks].filter((task) => task.completed);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Task List</Typography>

      {/* Input Field */}
      <Box sx={{ display: "flex", marginBottom: 2 }}>
        <TextField
          fullWidth
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask(); // Call the task addition function
            }
          }}
        />
        <Button
          onClick={handleAddTask}
          sx={{ marginLeft: 1, backgroundColor: "green", color: "white" }}
          variant="contained">
          Add
        </Button>
      </Box>

      {/* Active Tasks */}
      {activeTasks.map((task) => (
        <Box
          key={task.id}
          sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => handleToggleComplete(task.id)}
          />
          <Typography
            sx={{
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none",
            }}>
            {task.text}
          </Typography>
          <IconButton onClick={() => handleToggleStar(task.id)}>
            {task.starred ? <StarRateIcon /> : <StarBorderIcon />}
          </IconButton>
          <IconButton onClick={() => handleEditTask(task)}>
            <EditIcon />
          </IconButton>
        </Box>
      ))}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Completed</Typography>
          {completedTasks.map((task) => (
            <Box
              key={task.id}
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <Typography
                sx={{
                  flex: 1,
                  textDecoration: "line-through",
                  color: "gray",
                }}>
                {task.text}
              </Typography>
              <IconButton onClick={() => handleToggleStar(task.id)}>
                {task.starred ? <StarRateIcon /> : <StarBorderIcon />}
              </IconButton>
              <IconButton onClick={() => handleEditTask(task)}>
                <EditIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Edit Task Dialog */}
      {editingTask && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              value={editingTask.text}
              onChange={(e) =>
                setEditingTask({ ...editingTask, text: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteTask(editingTask.id)}
              color="error">
              Delete
            </Button>
            <Button onClick={handleUpdateTask} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TaskList;
