import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { getAllPosts, getPosts, getPostsStatus } from "../../redux/postsSlice";
import Post from "../../components/post-card/Post";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Ticker from "framer-motion-ticker";
import { useNavigate } from "react-router-dom";
import MainImage from "../../components/main-page/MainImage";
import CarsCarousel from "../../components/main-page/CarsCarousel";
import Reveal from "../../components/Reveal";

const MainPage = () => {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const status = useSelector(getPostsStatus, shallowEqual);
  const posts = useSelector(getPosts, shallowEqual);
  console.log({ status });
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (status === "loading") return <>loading...</>;
  if (status === "failed") return <>Error fetching posts.</>;

  return (
    <div style={{ height: "100%" }}>
      <MainImage
        posts={posts}
        text=" Discover a world of premium rental cars and unforgettable journeys with
        us."
        url={
          "https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp"
        }
      />
      {status === "succeeded" && posts.length === 0 && (
        <div>No posts available</div>
      )}
      <Grid container className="container">
        <Grid item xs={12} className="ticker-motion-div-container">
          <CarsCarousel posts={posts} />
        </Grid>
        <Grid item xs={12} className="about-us-div-container">
          <Reveal>
            <Typography variant="h3">About Us</Typography>
            <Typography variant="h6">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </Typography>
            <Button
              onClick={() => navigate("/about-us")}
              size="large"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
            >
              READ MORE
            </Button>
          </Reveal>
        </Grid>

        {/**/}
      </Grid>
    </div>
  );
};

export default MainPage;
