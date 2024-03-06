import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMenu from "./CardMenu";

const Post = ({ post, deletePost, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => navigate(`/${post.id}/edit`);

  return (
    <Card>
      <CardContent sx={{ height: "300px" }}>
        <Grid container spacing={2} direction={"column"}>
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
          <Grid item>
            <Typography component="div">
              Description: {post.description}
            </Typography>
            <Typography color="text.secondary">
              Price: {post.price} {post.currency}
            </Typography>
            <Typography variant="body2">Brand: {post.brand}</Typography>
            <Typography variant="body2">Type: {post.type}</Typography>
            <Typography variant="body2">Model: {post.model}</Typography>
            <Typography variant="body2">
              Transmission: {post.transmission}
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
      <CardActions>
        <Button size="small" onClick={() => navigate(`/${post.id}/quick-view`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
