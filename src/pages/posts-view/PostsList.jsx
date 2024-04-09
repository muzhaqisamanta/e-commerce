import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Post from "../../components/post-card/Post";
import MainImage from "../../components/main-page/MainImage";

const PostsList = () => {
  const location = useLocation();
  const posts = location.state.posts || [];

  return (
    <>
      <MainImage
        text=" Discover a world of premium rental cars and unforgettable journeys with
        us."
        url={
          "https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp"
        }
      />
      <motion.div
        className="container .motiondiv-posts-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        v
        transition={{ duration: 1.5 }}
      >
        <Grid className="posts-list-container" container direction="row" px={8}>
          {posts.map((post, index) => (
            <Grid
              item
              xs={6}
              p={2}
              key={index}
              component={motion.div}
              whileHover={{ scale: [null, 1.05] }}
              transition={{ duration: 0.3 }}
            >
              <Post post={post} user={null} isList={location.state.isList} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </>
  );
};

export default PostsList;
