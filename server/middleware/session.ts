export default (req, res, next) => {
    console.log("Legacy middleware: ", req.url);
    next();
};
