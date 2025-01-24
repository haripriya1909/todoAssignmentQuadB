import { useState, useEffect } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screens
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleClearAll = () => {
    const updatedTasks = [];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        {isMobile ? (
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={handleToggleSidebar}
            sx={{
              "& .MuiDrawer-paper": { width: "300px" },
            }}>
            <Sidebar
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              tasks={tasks}
              onClearAll={handleClearAll}
            />
          </Drawer>
        ) : (
          <Sidebar
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            tasks={tasks}
            onClearAll={handleClearAll}
          />
        )}

        <Box sx={{ flexGrow: 1 }}>
          <h3>Login and Go to All Tasks on your sidebar to plan your day!!</h3>
          <h5>All Tasks will get saved in LocalStorage for a session</h5>
          <Outlet context={{ tasks, updateTasks }} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
