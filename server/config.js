const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/golden-owl-test',
  port: process.env.PORT || 3001,
};

export default config;
