import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { useDataForm } from "../../state/use-data-form";
import {
  getCarModels,
  getBrands,
  getModels,
  getTypes,
} from "../../redux/carInfoSlice";
import BasicInformationForm from "../../components/posts-form/BasicInformationForm";
import CarDetailsForm from "../../components/posts-form/CarDetailsForm";
import PricingForm from "../../components/posts-form/PricingForm";
import ImagesForm from "../../components/posts-form/ImagesForm";
import Reveal from "../../components/Reveal";

const PostForm = (props) => {
  console.log("@@@@POST FORM @@@");
  const {
    snackbarOpen,
    setSnackbarOpen,
    handleClickLoginLink,
    handleSubmit,
    formData,
  } = props;
  const dispatch = useDispatch();

  const {
    register,
    control,
    watch,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    imagesList: { append: appendImg, remove: removeImg, fields: imagesList },
  } = useDataForm(formData);

  const watchBrandValue = watch("postData.brand");
  const watchCurrencyValue = watch("postData.currency");

  useEffect(() => {
    const fetchCarModels = async () => {
      await dispatch(getCarModels({ brand: watchBrandValue }));
    };
    fetchCarModels();
    setValue("postData.model", "");
  }, [watchBrandValue]);

  const addImage = (data) => {
    appendImg(data);
  };
  const types = useSelector(getTypes, shallowEqual);
  const brands = useSelector(getBrands, shallowEqual);
  const models = useSelector(getModels, shallowEqual);

  const submit = async () => {
    const isValid = await trigger("postData");
    const data = getValues("postData");
    handleSubmit(isValid, data);
  };

  console.log(getValues());

  return (
    <Grid container spacing={5} direction={"row"}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          <AlertTitle>No user is logged!</AlertTitle>
          <Link to="/log-in" onClick={handleClickLoginLink}>
            Log-in!
          </Link>
        </Alert>
      </Snackbar>

      <Grid item sx={{ width: "100%" }}>
        <Reveal>
          <BasicInformationForm
            control={control}
            register={register}
            errors={{
              title: errors.postData?.title,
              description: errors.postData?.description,
              postType: errors?.postData?.postType,
            }}
            postTypeValue={getValues("postData.postType")}
          />
        </Reveal>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        {" "}
        <Reveal>
          <CarDetailsForm
            register={register}
            control={control}
            errors={{
              type: errors.postData?.type,
              brand: errors.postData?.brand,
              model: errors.postData?.model,
              color: errors.postData?.color,
              kilometers: errors.postData?.kilometers,
              power: errors.postData?.power,
              enigeSize: errors.postData?.engineSize,
            }}
            watchBrandValue={watchBrandValue}
            data={{
              models: models,
              types: types,
              brands: brands,
            }}
          />
        </Reveal>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Reveal>
          <PricingForm
            register={register}
            errors={{
              price: errors.postData?.price,
            }}
            watchCurrencyValue={watchCurrencyValue}
          />
        </Reveal>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Reveal>
          <ImagesForm
            addImage={addImage}
            imagesList={imagesList}
            removeImg={removeImg}
            getValues={getValues}
          />
        </Reveal>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={submit}>
          Submit post
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostForm;
