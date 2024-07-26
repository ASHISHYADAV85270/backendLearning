// const asyncHandler = (fn) => {
//   (req, res, next) => {
//     Promise.resolve(() => {
//       fn(req, res, next);
//     }).catch((err) => {
//       next(err);
//     });
//   };
// };

// return { asyncHandler };

// by using try catch
const asyncHandler = (fn) => {
 return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.code || 400).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export { asyncHandler };
