import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editPost,
  getPost,
  getPostById,
  getPostsError,
} from "../../redux/postsSlice";
import MainImage from "../../components/main-page/MainImage";
import { getLoggedUser } from "../../redux/userSlice";
import { getCarBrands, getCarTypes } from "../../redux/carInfoSlice";
import { defaultValues } from "../../utils/default-values";
import { ContentWrapper } from "../../styled-components/StyledComponents";
import PostForm from "./PostForm";

const EditPost = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();

  const post = useSelector(getPost);
  const error = useSelector(getPostsError);
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(getPostById(postId));
    };
    fetchPost();
  }, [dispatch]);

  const formData = { ...defaultValues, postData: post };

  useEffect(() => {
    dispatch(getCarTypes());
    dispatch(getCarBrands());
  }, []);

  const handleSubmit = async (isValid, data) => {
    if (!isValid) {
      console.log({ error });
      return;
    }
    if (!loggedUser) {
      setSnackbarOpen(true);
      return;
    }
    await dispatch(editPost({ postId: postId, data: data }));
    localStorage.removeItem("postdata");
    navigate(`/${postId}/quick-view`);
  };

  if (!post) {
    return <>loading..</>;
  }

  return (
    <>
      <MainImage
        text="Edit you information."
        url={
          "https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp"
        }
      />
      <ContentWrapper className="container">
        {!!post && (
          <PostForm
            snackbarOpen={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        )}
      </ContentWrapper>
    </>
  );
};

export default EditPost;
