module.exports = {
  edumate: {
    host: process.env.EDUMATE_HOST,
    port: process.env.EDUMATE_PORT,
    suffix: process.env.EDUMATE_PATH,
    username: process.env.EDUMATE_USERNAME,
    password: process.env.EDUMATE_PASSWORD
  },
  canvas: {
    headers: { 'Authorization': `Bearer ${process.env.CANVAS_API_KEY}` }
  },
  throttle: 200
};
