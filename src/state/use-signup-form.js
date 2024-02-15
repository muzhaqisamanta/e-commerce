import { useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { userDataSchema } from "./use-user-data-schema";

const useSignUpForm = () => {
  const form = useForm({
    defaultValues: {
      userData: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        email: "",
        phoneNumber: "",
      },
    },
    mode: "all",
    resolver: ajvResolver(userDataSchema),
  });

  return { ...form };
};

export default useSignUpForm;
