const Product = require("../../models/Product");
const fs = require("fs");
const path = require("path");

class ProductController {
  async index(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Current page number
      const limit = parseInt(req.query.limit) || 10; // Number of products per page

      // Calculate the number of products to skip based on the page and limit
      const skip = (page - 1) * limit;

      // Fetch the products for the current page using skip() and limit()
      const products = await Product.find().skip(skip).limit(limit);

      // Count the total number of products
      const totalProducts = await Product.countDocuments();

      res.status(200).json({
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong with server" });
    }
  }

  async getProductWithoutLimit(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong with server" });
    }
  }

  async store(req, res, next) {
    try {
      const product = new Product(req.body);
      if (req.files) {
        const images = req.files.map((file) => {
          return file.filename;
        });
        product.images = images;
      }
      await product.save();
      res.status(200).json(product);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.quantity = req.body.quantity;
      product.status = req.body.status;
      product.category = req.body.category;
      product.rating = req.body.rating;
      
      if (req.files) {
        product.images.forEach((image) => {
          const imagePath = path.join(__dirname, "../../images", image);
          console.log(imagePath);
          try {
            fs.unlinkSync(imagePath);
          } catch (err) {
            console.log("image not found");
          }
        });
      }

      const images = req.files.map((file) => {
        return file.filename;
      });
      product.images = images;
      await product.save();
      res.status(200).json(product);
    } catch (err) {
      // res.status(400).json({ error: "You need to fill correct information" });
      res.status(400).json(err);
    }
  }

  async show(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Product not found" });
    }
  }

  async delete(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.id });

      if (!product) {
        return res.status(404).json({ message: "Product not found 1" });
      }

      const images = product.images;

      if (!images || images.length === 0) {
        return res.status(404).json({ message: "No images found" });
      }

      for (const image of images) {
        const imagePath = path.join(__dirname, "../../images", image);
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.log("image not found");
        }
        //  fs.unlinkSync(imagePath);
      }

      await Product.deleteOne({ _id: req.params.id });
      // await product.save();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(404).json({ error: "Product not found" });
    }
  }

  //search Product by name
  async search(req, res, next) {
    try {
      const product = await Product.find({ name: req.query.name });
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Product not found" });
    }
  }
}

module.exports = new ProductController();
