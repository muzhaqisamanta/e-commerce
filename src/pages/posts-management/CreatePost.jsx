import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getPostsError } from "../../redux/postsSlice";
import { getLoggedUser } from "../../redux/userSlice";
import { defaultValues } from "../../utils/default-values";
import { getCarBrands, getCarTypes } from "../../redux/carInfoSlice";
import PostForm from "./PostForm";
import { ContentWrapper } from "../../styled-components/StyledComponents";
import MainImage from "../../components/main-page/MainImage";
import Reveal from "../../components/Reveal";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const error = useSelector(getPostsError);
  const loggedUser = useSelector(getLoggedUser);
  const localStorageData = JSON.parse(localStorage.getItem("postdata"));

  const formData = localStorageData
    ? { ...defaultValues, postData: localStorageData }
    : defaultValues;

  useEffect(() => {
    dispatch(getCarTypes());
    dispatch(getCarBrands());
  }, []);

  const handleClickLoginLink = () => {
    localStorage.setItem("postdata", JSON.stringify(getValues("postData")));
  };

  const handleSubmit = async (isValid, data) => {
    if (!isValid) {
      console.log({ error });
      return;
    }
    if (!loggedUser) {
      console.log("no logged user");
      setSnackbarOpen(true);
      return;
    }
    const response = await dispatch(addNewPost(data));
    const postId = response?.payload?.id;
    localStorage.removeItem("postdata");
    navigate(`/${postId}/quick-view`);
  };

  return (
    <>
      <MainImage
        text="Create a new car option."
        url={
          "https://www.mercedes-benz-techinnovation.com/_ipx/w_2660/home/hero_yellow.webp"
        }
      />
      <ContentWrapper className="container">
        <PostForm
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          handleClickLoginLink={handleClickLoginLink}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </ContentWrapper>
    </>
  );
};

export default CreatePost;
