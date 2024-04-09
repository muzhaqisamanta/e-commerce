import Ticker from "framer-motion-ticker";
import React, { useState } from "react";
import Post from "../post-card/Post";
import { Grid } from "@mui/material";

const CarsCarousel = ({ posts }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Ticker
      duration={30}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      // isPlaying={isPlaying}
    >
      {posts.map((post, index) => (
        <Grid
          item
          //   xs={6}
          key={index}
          style={{
            margin: "5px",
            height: "280px",
            width: "200px",
          }}
        >
          <Post post={post} user={null} />
        </Grid>
      ))}
    </Ticker>
  );
};

export default CarsCarousel;
