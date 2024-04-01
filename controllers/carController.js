const { Car } = require("../models");

// Get
const getCars = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "success",
      data: {
        totalData: cars.length,
        cars,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get by id
const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        totalData: car.length,
        car,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Create
const createCar = async (req, res) => {
  try {
    let photo = null;
    if (req.file) {
      photo = req.file.filename;
    }

    const carData = { ...req.body, photo };
    await Car.create(carData);
    res.status(200).json({
      status: "success",
      data: {
        totalData: carData.length,
        carData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update
const updateCar = async (req, res) => {
  try {
    const car = await Car.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const carUpdate = await Car.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        totalData: carUpdate.length,
        carUpdate,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete
const deleteCar = async (req, res) => {
  try {
    const car = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "berhasil delete data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};