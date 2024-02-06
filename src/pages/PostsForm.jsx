import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import {
  getBrands,
  getCarBrands,
  getCarModels,
  getCarTypes,
  getModels,
  getTypes,
} from "../redux/carInfoSlice";
import { addNewPost, getError, getStatus } from "../redux/postsSlice";
import { getLoggedUser } from "../redux/userSlice";
import { useDataForm } from "../state/use-data-form";
import EnumSelect from "../components/EnumSelect";
import ImageHoverCard from "../components/ImageHoverCard";
import Uploader from "../components/Uploader";
import defaultValues from "../utils/default-values.json";

const PostsForm = () => {
  const dispatch = useDispatch();
  const [modelsState, setModelsState] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const types = useSelector(getTypes);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const brands = useSelector(getBrands);
  const models = useSelector(getModels);
  const loggedUser = useSelector(getLoggedUser);
  const localStorageData = JSON.parse(localStorage.getItem("postdata"));

  const formData = localStorageData
    ? { ...defaultValues, postData: localStorageData }
    : defaultValues;

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

  useEffect(() => {
    dispatch(getCarTypes());
    dispatch(getCarBrands());
  }, []);

  useEffect(() => {
    const fetchCarModels = async () => {
      await dispatch(getCarModels({ brand: getValues("postData.brand") }));
    };
    fetchCarModels();
    setValue("postData.model", "");
  }, [watchBrandValue]);

  useEffect(() => {
    setModelsState(models);
  }, [models]);

  const addImage = (data) => {
    console.log("data in  append", data);
    appendImg(data);
  };

  const year = new Date().getFullYear();
  const years = Array.from(new Array(30), (val, index) =>
    (year - index).toString()
  );
  const handleSubmit = async () => {
    const isValid = await trigger("postData");
    console.log({ isValid });
    if (!isValid) {
      console.log({ error });
      return;
    }
    if (!loggedUser) {
      setSnackbarOpen(true);
      return;
    }
    await dispatch(addNewPost(getValues("postData")));
    localStorage.removeItem("postdata");
  };

  const handleClick = () => {
    localStorage.setItem("postdata", JSON.stringify(getValues("postData")));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={5}
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          <AlertTitle>No user is logged!</AlertTitle>
          <Link to="/log-in" onClick={handleClick}>
            Log-in!
          </Link>
        </Alert>
      </Snackbar>
      <Grid item container spacing={2} direction="row">
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Title"
            {...register("postData.title")}
            error={!!errors.postData?.title}
            helperText={errors.postData?.title?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Description"
            {...register("postData.description")}
            error={!!errors.postData?.description}
            helperText={errors.postData?.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Post Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="RENT"
                control={<Radio {...register("postData.postType")} />}
                label="Rent"
              />
              <FormControlLabel
                value="SALE"
                control={<Radio {...register("postData.postType")} />}
                label="Sale"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Color"
            {...register("postData.color")}
            error={!!errors.postData?.color}
            helperText={errors.postData?.color?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            render={({ field }) => {
              return (
                <Autocomplete
                  options={types}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      margin="normal"
                      error={!!errors.postData?.type}
                      helperText={errors.postData?.type?.message}
                    />
                  )}
                  value={field.value === "" ? null : field.value}
                  onChange={(e, data) => field.onChange(data)}
                />
              );
            }}
            name="postData.type"
            control={control}
            defaultValue="Convertible"
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            render={({ field }) => {
              console.log(field.value);
              return (
                <Autocomplete
                  options={brands || []}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Car Brand"
                      margin="normal"
                      error={!!errors.postData?.brand}
                      helperText={errors.postData?.brand?.message}
                    />
                  )}
                  value={field.value === "" ? null : field.value}
                  onChange={(e, data) => field.onChange(data)}
                />
              );
            }}
            name="postData.brand"
            control={control}
          />
        </Grid>
        {watch("postData.brand") && (
          <Grid item xs={12}>
            <Controller
              render={({ field }) => {
                return (
                  <Autocomplete
                    options={modelsState || []}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Model"
                        margin="normal"
                        error={!!errors.postData?.model}
                        helperText={errors.postData?.model?.message}
                      />
                    )}
                    value={field.value === "" ? null : field.value}
                    onChange={(e, data) => field.onChange(data)}
                  />
                );
              }}
              name="postData.model"
              control={control}
            />
          </Grid>
        )}
        <Grid item xs={3}>
          <EnumSelect
            label="Transmission"
            registerField={register("postData.transmission")}
            values={["AUTOMATIC", "MANUAL", "ROBOTIC"]}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
            label="Kilometers"
            type="number"
            {...register("postData.kilometers")}
            error={!!errors.postData?.kilometers}
            helperText={errors.postData?.kilometers?.message}
          />
        </Grid>
        <Grid item xs={3}>
          <EnumSelect
            label="Fuel"
            registerField={register("postData.fuel")}
            values={["DIESEL", "GASOLINE", "GAS"]}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">kW</InputAdornment>,
            }}
            label="Power"
            type="number"
            {...register("postData.power")}
            error={!!errors.postData?.power}
            helperText={errors.postData?.power?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <EnumSelect
            label="Currency"
            registerField={register("postData.currency")}
            values={["ALL", "EUR", "USD", "GBP"]}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            {...register("postData.price")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {watch("postData.currency")}
                </InputAdornment>
              ),
            }}
            label="Price"
            type="number"
            error={!!errors.postData?.price}
            helperText={errors.postData?.price?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <EnumSelect
            label="First Registration"
            registerField={register("postData.firstRegistration")}
            values={years}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Engine Size"
            type="number"
            {...register("postData.engineSize")}
            error={!!errors.postData?.engineSize}
            helperText={errors.postData?.engineSize?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Uploader addImage={addImage} />
        </Grid>
        {imagesList.length > 0 &&
          getValues("postData.imageUrls").map((el, index) => {
            return (
              <Grid item key={index}>
                <ImageHoverCard
                  url={`data:image/jpeg;base64,${el}`}
                  onDelete={() => removeImg(index)}
                  onView={() => {
                    setIsOpenModalImage((prev) => !prev);
                    setUrlImageSelected(el);
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit post
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostsForm;
