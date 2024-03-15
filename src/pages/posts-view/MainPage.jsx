import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { getAllPosts, getPosts, getPostsStatus } from "../../redux/postsSlice";
import Post from "../../components/post-card/Post";

const MainPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getPostsStatus, shallowEqual);
  const posts = useSelector(getPosts, shallowEqual);
  console.log({ status });
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (status === "loading") return <>loading...</>;
  if (status === "failed") return <>Error fetching posts.</>;
  return (
    <div>
      <Grid container direction="row" spacing={2}>
        {status === "succeeded" && posts.length === 0 && (
          <div>No posts available</div>
        )}
        {posts.map((post, index) => (
          <Grid item xs={6} key={index}>
            <Post post={post} user={null} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainPage;
