const { Car } = require("../models");

const carPage = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.render("cars/index.ejs", {
      cars,
      message: req.flash("message", ""),
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const createCarPage = async (req, res) => {
  try {
    res.render("cars/create.ejs");
  } catch (err) {
    res.render("error.ejs", {
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
    req.flash("message", "Data Berhasil Disimpan");
    res.redirect("/cars");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Gagal menambahkan data mobil");
    res.redirect("/cars");
  }
};

// Edit
const editCarPage = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    res.render("cars/edit.ejs", {
      car,
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

const editCar = async (req, res) => {
  try {
    // Dapatkan nama file foto yang sudah ada dari input tersembunyi
    const existingPhoto = req.body.existing_photo;

    // Periksa apakah ada file baru yang diunggah
    let newPhoto;
    if (req.file) {
      // Jika ada file baru, gunakan nama file baru
      newPhoto = req.file.filename;
    } else {
      // Jika tidak ada file baru, gunakan nama file yang sudah ada
      newPhoto = existingPhoto;
    }

    // Update data mobil, termasuk nama file foto baru atau yang sudah ada
    await Car.update(
      { ...req.body, photo: newPhoto }, // Gunakan nama file baru atau yang sudah ada
      {
        where: {
          id: req.params.id,
        },
      }
    );

    req.flash("message", "Diedit");
    res.redirect("/cars");
  } catch (err) {
    res.render("error.ejs", {
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
    req.flash("message", "Di hapus");
    res.redirect("/cars");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  carPage,
  createCarPage,
  createCar,
  editCarPage,
  editCar,
  deleteCar,
};
