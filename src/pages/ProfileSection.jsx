import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { getLoggedUser } from "../redux/userSlice";
import Post from "../components/post-card/Post";
import MainImage from "../components/main-page/MainImage";
import {
  deletePost,
  getPostsStatus,
  getProfilePosts,
  getUserPosts,
} from "../redux/postsSlice";

const ProfileSection = () => {
  const dispatch = useDispatch();

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
      <MainImage
        text="Discover your options or create a new one."
        url={
          "https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp"
        }
        createNew={true}
      />
      <Grid container direction="row" spacing={3} className="container">
        {status === "failed" && <>Error fetching posts.</>}
        {status === "succeeded" && posts.length === 0 && (
          <div>No posts available</div>
        )}
        {posts.map((post, index) => (
          <Grid
            item
            xs={6}
            key={index}
            component={motion.div}
            whileHover={{ scale: [null, 1.05] }}
            transition={{ duration: 0.3 }}
          >
            <Post
              post={post}
              deletePost={handleDelete}
              user={user}
              isList={true}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProfileSection;
