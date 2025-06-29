import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Post from "../components/Post";
import { getAllPosts, getPosts, getStatus } from "../redux/postsSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const posts = useSelector(getPosts);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPosts());
    }
  }, [dispatch]);

  if (posts.length === 0) return <div>No posts available</div>;
  return (
    <div>
      <Grid container direction="row" spacing={2}>
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
        {posts.map((post, index) => (
          <Grid item xs={6} key={index}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainPage;
