const dev = {
  context: "http://localhost:3001/"
};

const prod = {
  context: "http://ec2-18-217-32-136.us-east-2.compute.amazonaws.com:3001"
};

export const environment = process.env.NODE_ENV === "production" ? prod : dev;
