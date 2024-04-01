const router = require("express").Router();

const CarAdmin = require("../controllers/carAdminController.js");

router.get("/", CarAdmin.carPage);
router.get("/create", CarAdmin.createCarPage);
router.post("/admin/create", CarAdmin.createCar);
router.get("/edit/:id", CarAdmin.editCarPage);
router.post("/admin/edit/:id", CarAdmin.editCar);
router.post("/admin/delete/:id", CarAdmin.deleteCar);

module.exports = router;
