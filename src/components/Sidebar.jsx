import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Link } from "react-router-dom";

const Sidebar = ({ totalTasks, completedTasks, onClearAll }) => {
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box
      sx={{
        width: "300px",
        height: "100vh",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        boxShadow: 3,
      }}>
      {/* Profile Section */}
      <Avatar
        src="https://via.placeholder.com/100"
        alt="Profile"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        Hey, ABCD
      </Typography>
      <List sx={{ width: "100%" }}>
        <Link to="/alltask">
          <ListItem button>
            <EventNoteIcon />
            <ListItemText primary="All Tasks" />
          </ListItem>
        </Link>
        <Link to="/today">
          <ListItem button>
            <CalendarTodayIcon />
            <ListItemText primary="Today" />
          </ListItem>
        </Link>
        <Link to="/important">
          <ListItem button>
            <StarBorderIcon />
            <ListItemText primary="Important" />
          </ListItem>
        </Link>
        <Link to="/alltask">
          <ListItem button>
            <SummarizeIcon />
            <ListItemText primary="Planned" />
          </ListItem>
        </Link>
      </List>
      {/* Task Stats */}
      <Box sx={{ margin: "1", textAlign: "center" }}>
        <Typography variant="subtitle1">Today’s Tasks</Typography>
        <Box
          sx={{ position: "relative", display: "inline-flex", marginTop: 2 }}>
          <CircularProgress
            variant="determinate"
            value={completionRate}
            size={80}
            thickness={4}
            sx={{ color: "green" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant="caption">{`${Math.round(
              completionRate
            )}%`}</Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ marginTop: 1 }}>
          {`${completedTasks} / ${totalTasks} completed`}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", marginY: 2 }} />

      {/* Clear All Button */}
      <Button
        variant="contained"
        color="error"
        onClick={onClearAll}
        sx={{ marginTop: "3", width: "90%" }}>
        Clear All
      </Button>
    </Box>
  );
};

export default Sidebar;
