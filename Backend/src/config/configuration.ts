export default () => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 5000,
  baseUrl: `http://${process.env.HOST}:${process.env.PORT}`,
});
