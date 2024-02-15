import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const Post = ({ post }) => {
  console.log({ post });
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.title}
        </Typography>
        <IconButton
          onClick={console.log("should open a menu")}
          sx={{ display: "flex", flexDirection: "end" }}
        >
          <MoreVertIcon />
        </IconButton>
        <Typography variant="h5" component="div">
          {post.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {post.price}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
