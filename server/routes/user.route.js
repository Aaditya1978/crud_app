const express = require("express");
const Router = express.Router();
const User = require("../model/user.model");

// route to create a new user
Router.post("/create_user", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phone || !req.body.address || !req.body.company || !req.body.designation) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  const { name, email, phone, address, company, designation } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User with Email already exists" });
  }
  const newUser = new User({
    name,
    email,
    phone,
    address,
    company,
    designation,
  });
  newUser.save().then((user) => {
    res.status(200).json({message: "User created successfully", user: user});
  });
});


// route to get all users
Router.get("/get_users", async (req, res) => {
    const users = await User.find();
    res.status(200).json({users});
});


// route to update a user details
Router.put("/update_user/:id", async (req, res) => {
    const { name, email, phone, address, company, designation } = req.body;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(400).send({ error: "User does not exist" });
    }
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.company = company;
    user.designation = designation;
    user.save().then((user) => {
        res.status(200).json({message: "User updated successfully", user: user});
    });
});


// route to delete a user
Router.delete("/delete_user/:id", async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(400).send({ error: "User does not exist" });
    }
    user.delete().then((user) => {
        res.status(200).json({message: "User deleted successfully",});
    });
});


module.exports = Router;