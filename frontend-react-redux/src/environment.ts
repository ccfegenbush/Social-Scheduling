const dev = {
  context: "http://localhost:8080/"
};

const prod = {
  context: "http://ec2-18-217-32-136.us-east-2.compute.amazonaws.com:8080"
};

export const environment = process.env.NODE_ENV === "production" ? prod : dev;
