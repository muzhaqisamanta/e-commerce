export const dataSchema = {
  type: "object",
  properties: {
    postData: {
      type: "object",
      properties: {
        title: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        description: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        postType: {
          type: "string",
          enum: ["RENT", "SALE"],
        },
        currency: {
          type: "string",
          enum: ["ALL", "EUR", "USD", "GBP"],
          errorMessage: { enum: "Invalid currency" },
        },
        type: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        postAdvertIndex: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        brand: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        color: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        transmission: {
          type: "string",
          enum: ["AUTOMATIC", "MANUAL", "ROBOTIC"],
          errorMessage: { enum: "Invalid transmission" },
        },
        kilometers: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        fuel: {
          type: "string",
          enum: ["DIESEL", "GASOLINE", "GAS"],
          errorMessage: { enum: "Invalid fuel type" },
        },
        power: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        price: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        firstRegistration: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        engineSize: {
          type: "string",
          minLength: 1,
          errorMessage: { minLength: "required" },
        },
        imageUrls: {
          type: "array",
          items: { type: "string" },
          errorMessage: { type: "Image URLs must be an array" },
        },
      },
    },
  },
};
