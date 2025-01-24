import { useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Important = () => {
  const { tasks } = useOutletContext();
  const importantTasks = tasks.filter((task) => task.starred);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">
        If you star the tasks ie. mark it as important only thode tasks ill
        appear here.
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "4",
          color:"red",
          marginTop:"5",
        }}>
        Important Tasks
      </Typography>
      {importantTasks.map((task, index) => (
        <Typography
          sx={{
            marginBottom: "4",
          }}
          key={index}>
          {task.text}
        </Typography>
      ))}
    </Box>
  );
};

export default Important;
