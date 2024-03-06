import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editPost,
  getPost,
  getPostById,
  getPostsError,
} from "../../redux/postsSlice";
import PostForm from "./PostForm";
import { getLoggedUser } from "../../redux/userSlice";
import { getCarBrands, getCarTypes } from "../../redux/carInfoSlice";
import { defaultValues } from "../../utils/default-values";

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
    <div>
      {!!post && (
        <PostForm
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default EditPost;
