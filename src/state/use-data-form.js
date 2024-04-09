import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { dataSchema } from "./react-hook-form-schema/use-data-schema";

export const useDataForm = (defaultValues) => {
  console.log("test");
  const form = useForm({
    defaultValues: defaultValues,
    mode: "all",
    resolver: ajvResolver(dataSchema),
  });

  const imagesList = useFieldArray({
    control: form.control,
    name: "postData.imageUrls",
  });

  // Memoize the hook to optimize initial render
  const memoizedForm = useMemo(() => {
    return { ...form, imagesList };
  }, [form, imagesList]);

  return memoizedForm;
};
