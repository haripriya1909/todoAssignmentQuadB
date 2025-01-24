import { useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const AllTask = () => {
  const { tasks } = useOutletContext();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "4",
          color: "red",
          marginTop: "5",
        }}>
        All Tasks
      </Typography>
      {tasks.map((task, index) => (
        <Typography key={index}>{task.text}</Typography>
      ))}
    </Box>
  );
};

export default AllTask;
