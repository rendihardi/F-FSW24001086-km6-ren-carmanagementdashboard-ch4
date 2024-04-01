const router = require("express").Router();

const Car = require("./carRouter.js");
const CarAdmin = require("./carAdminRouter");

router.use("/api/v1/cars", Car);
router.use("/cars", CarAdmin);

module.exports = router;
