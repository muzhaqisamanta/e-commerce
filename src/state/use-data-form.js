import { useFieldArray, useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { dataSchema } from "./use-data-schema";

export const useDataForm = (defaultValues) => {
  const form = useForm({
    defaultValues: defaultValues,
    mode: "all",
    resolver: ajvResolver(dataSchema),
  });

  const imagesList = useFieldArray({
    control: form.control,
    name: "postData.imageUrls",
  });

  return { ...form, imagesList };
};
