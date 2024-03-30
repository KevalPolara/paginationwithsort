const User = require("../models/User");

exports.addUserData = async (req, res) => {
  const userData = req.body;

  console.log("userData", userData);
  try {
    if (!userData) {
      res.status(500).json({ message: "UserData is Not Found" });
    }

    const createUser = await User.create(userData);

    console.log("createUser", createUser);

    if (!createUser) {
      res.status(500).send({ message: "User Not Created" });
    }

    res.status(201).send({
      message: "User Created Succesfully",
      createUser: createUser,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    console.log(req.query);
    let sortUserName = req.query.sortColumn;
    const sortorder = req.query.sortName;

    const filterValue = req?.query?.search;
    const page = Number(req?.query?.page) || 1;
    const pageSize = Number(req?.query?.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const count = await User.countDocuments(data);
    const rowcount = { count };
    const totalpage = Math.ceil(count / pageSize);
    let getUserData;
    let mysort;

    if (sortorder == "asc") {
      mysort = { [sortUserName]: 1 };
    } else {
      mysort = { [sortUserName]: -1 };
    }

    console.log("totalPage", totalpage);
    console.log("page", page);
    console.log("pageSize", pageSize);
    console.log("skip", skip);
    console.log("filterValue", filterValue);
    console.log("filterValue", Boolean(filterValue && page));


    let data = {};
    if (Boolean(filterValue) && page) {
      data = await User.find({
        $or: [
          { firstName: { $regex: filterValue, $options: "i" } },
          { lastName: { $regex: filterValue, $options: "i" } },
        ],
      })
        .skip(skip)
        .limit(pageSize)
        .collation({ locale: "en" })
        .sort({ ...mysort, _id: -1 });
    } 
    // else {
    //   getUserData = await User.find({})
    //     .skip(skip)
    //     .limit(pageSize)
    //     .collation({ locale: "en" })
    //     .sort({ ...mysort, _id: -1 });
    // }
    console.log("getUserData", getUserData);

    if (!getUserData) {
      res.status(500).send({ message: "UserData is Not Get" });
    }

    res.status(201).send({
      message: "UserData Get SuccesFully",
      getUserData: getUserData,
      rowcount: rowcount,
      data: data,
    });

    console.log("rowCount", rowcount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserData = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleteUserData = await User.findByIdAndDelete(userId);

    if (!deleteUserData) {
      res.status(500).send({ message: "User Is Not Deleted" });
    }
    res.status(201).send({
      message: "Delete User Data SuccesFully",
      deleteUserData: deleteUserData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editUserData = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.params.id;

    const editUserData = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!editUserData) {
      res.status(500).send({ message: "UserData is Not Edited" });
    }

    res.status(201).send({
      message: "Edit User Data SuccesFully",
      editUserData: editUserData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
