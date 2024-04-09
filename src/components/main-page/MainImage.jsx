import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

const MainImage = ({ posts, url, text, createNew }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        display: "flex",
        alignItems: "flex-end",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        padding: 24,
        marginBottom: 24,
      }}
    >
      <Typography mr={2} variant="h5">
        {text}
      </Typography>
      {createNew && (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Add post">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => navigate("/add-post")}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      )}
      {posts && (
        <Button
          component={motion.div}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.8 }}
          endIcon={<ArrowForwardIcon />}
          color="inherit"
          variant="outlined"
          onClick={() =>
            navigate("/posts-list", {
              state: { posts: posts, isList: true },
            })
          }
        >
          VIEW ALL
        </Button>
      )}
    </motion.div>
  );
};

export default MainImage;
