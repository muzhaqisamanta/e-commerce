import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostById } from "../../redux/postsSlice";

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

  console.log({ post });

  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setOpenModal(true);
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? post.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === post.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!post) {
    return <>loading data</>;
  }
  return (
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
                  {/* {post.imageUrls &&
                    post.imageUrls.map((url, index) => (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card
                          onClick={() => handleOpenModal(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={`data:image/png;base64,${url}`}
                            style={{
                              //todo fixed width
                              maxWidth: "100%",
                              maxHeight: "100%",
                              // height: "auto",
                              marginBottom: 10,
                            }}
                          />
                        </Card>
                      </Grid>
                    ))} */}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {openModal && (
          <Modal
            open={openModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
            onClose={handleCloseModal}
          >
            <Fade in={openModal}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <IconButton aria-label="Previous" onClick={handlePrevImage}>
                  <ArrowBack />
                </IconButton>
                <img
                  src={`data:image/jpg;base64,${post.imageUrls[selectedImageIndex]}`}
                  style={{ width: "90%", height: "90%" }}
                />
                <IconButton aria-label="Next" onClick={handleNextImage}>
                  <ArrowForward />
                </IconButton>
              </Box>
            </Fade>
          </Modal>
        )}
      </Grid>
    </Grid>
  );
};

export default QuickView;
