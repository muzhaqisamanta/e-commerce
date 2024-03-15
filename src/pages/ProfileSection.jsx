import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Post from "../components/post-card/Post";
import {
  deletePost,
  getPostsStatus,
  getProfilePosts,
  getUserPosts,
} from "../redux/postsSlice";
import { getLoggedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getLoggedUser, shallowEqual);
  const status = useSelector(getPostsStatus);
  const posts = useSelector(getProfilePosts);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id));
      dispatch(getUserPosts());
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (status === "loading") return <>loading...</>;

  return (
    <div>
      <Grid container direction="row" spacing={2}>
        {status === "failed" && <>Error fetching posts.</>}{" "}
        {status === "succeeded" && posts.length === 0 && (
          <div>No posts available</div>
        )}
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
            <Post post={post} deletePost={handleDelete} user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProfileSection;
