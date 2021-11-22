const prod = Object.freeze({
  apiUrl: "https://bookfish-back.azurewebsites.net",
  // apiUrl: "http://localhost:3000",
});

const dev = Object.freeze({
  apiUrl: "https://bookfish-back.azurewebsites.net",
  // apiUrl: "http://localhost:3000",
});

export const config = process.env.NODE_ENV === "development" ? dev : prod;
