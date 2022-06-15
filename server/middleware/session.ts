export default defineEventHandler((event) => {
  console.log("url: ", event.req.url);
});
