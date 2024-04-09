export const userDataSchema = {
  type: "object",
  properties: {
    userData: {
      type: "object",
      properties: {
        username: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        password: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        firstName: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        lastName: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        address: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        city: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        country: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        email: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        phoneNumber: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
      },
    },
  },
};
