import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMenu from "./CardMenu";

const Post = ({ post, deletePost, user, isList = null }) => {
  const [showButton, setShowButton] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const showHideButton = () => setShowButton(true);
  const hideButton = () => setShowButton(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => navigate(`/${post.id}/edit`);

  return (
    <Card
      component={motion.div}
      onMouseEnter={showHideButton}
      onMouseLeave={hideButton}
      style={{ border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <CardContent
        sx={{
          height: isList ? "300px" : "200px",
          backgroundColor: showButton
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Grid container direction={"column"}>
          <Grid
            item
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="h5" gutterBottom>
              Title: {post.title}
            </Typography>
            {!!user && (
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <img
              srcSet={`data:image/png;base64,${post.imageUrls[0]}`}
              src={`data:image/png;base64,${post.imageUrls[0]}`}
              style={{
                height: isList ? "180px" : "90px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item>
            <Typography component="div">
              Description: {post.description}
            </Typography>
            <Typography>
              Price: {post.price} {post.currency}
            </Typography>
          </Grid>
          {!!user && (
            <CardMenu
              handleEdit={handleEdit}
              anchorEl={anchorEl}
              handleClose={handleClose}
              //todo: add a dialog for delete...
              deletePost={() => {
                deletePost(post.id);
                setAnchorEl(null);
              }}
            />
          )}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          width: "100%",
          transition: "opacity 0.3s ease",
        }}
      >
        {isList && (
          <>
            <Button
              component={motion.div}
              variant="contained"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.8 }}
              size="medium"
              // onClick={() => navigate(`/${post.id}/quick-view`)}
            >
              Book now
            </Button>
            <Button
              component={motion.div}
              variant="contained"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.8 }}
              size="medium"
              onClick={() => navigate(`/${post.id}/quick-view`)}
            >
              View Details
            </Button>
          </>
        )}
        {!isList && (
          <Button
            component={motion.div}
            variant="contained"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.8 }}
            size="small"
            onClick={() => navigate(`/${post.id}/quick-view`)}
          >
            View Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
