import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPost, getPostById } from "../../redux/postsSlice";
import ImagesModal from "../../components/ImagesModal";
import MainImage from "../../components/main-page/MainImage";

const QuickView = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const post = useSelector(getPost);

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(getPostById(postId));
    };
    fetchPost();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setOpenModal(true);
    setSelectedImageIndex(index);
  };

  if (!post) {
    return <>loading data</>;
  }
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
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {post.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Car Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                      Post Type: {post.postType}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Currency: {post.currency}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Transmission: {post.transmission}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                      Fuel: {post.fuel}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      First Registration: {post.firstRegistration}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Post Advert Index: {post.postAdvertIndex}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                      Color: {post.color}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Kilometers: {post.kilometers}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Power: {post.power}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Price: {post.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Engine Size: {post.engineSize}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <ImageList cols={5}>
                        {post.imageUrls.map((url, index) => (
                          <ImageListItem
                            key={index}
                            onClick={() => handleOpenModal(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              srcSet={`data:image/png;base64,${url}`}
                              src={`data:image/png;base64,${url}`}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {openModal && (
              <ImagesModal
                openModal={openModal}
                setSelectedImageIndex={setSelectedImageIndex}
                setOpenModal={setOpenModal}
                selectedImageIndex={selectedImageIndex}
                data={post.imageUrls}
              />
            )}
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default QuickView;
