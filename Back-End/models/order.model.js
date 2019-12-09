const mysql = require("../dbconnection.js");

//Task object constructor
const Order = function(order) {
  this.idOrder = order.idOrder | 0;
  this.PIN = order.PIN;
  this.status = order.status;
  this.totalPrice = order.totalPrice;
  this.numberPeople = order.numberPeople;
  this.numberChildren = order.numberChildren;
  this.address = order.address;
  this.phone = order.phone;
  this.email = order.email;
  this.notes = order.notes;
  this.idAccount = order.idAccount;
};
Order.getAllOrder = function(funcResult) {
  mysql.query("SELECT * FROM kinhdoanhtourdulich.orders ;", function(err, res) {
    if (err) {
      funcResult(err, null);
    } else {
      funcResult(null, res);
    }
  });
};

Order.getAllOrderForUser = function(idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM kinhdoanhtourdulich.orders where idAccount = ?; ",
    [idAccount],
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

Order.createOrder = function(newOrder, funcResult) {
  this.PIN = newOrder.PIN;
  this.status = newOrder.status;
  this.totalPrice = newOrder.totalPrice;
  this.numberPeople = newOrder.numberPeople;
  this.numberChildren = newOrder.numberChildren;
  this.address = newOrder.address;
  this.phone = newOrder.phone;
  this.email = newOrder.email;
  this.notes = newOrder.notes;
  this.idAccount = newOrder.idAccount;
  mysql.query(
    "INSERT INTO kinhdoanhtourdulich.orders (`PIN`, `status`, `totalPrice`, `numberPeople`," +
      " `numberChildren`, `address`, `phone`,`email`,`notes`, `idAccount`) VALUES ('" +
      this.PIN +
      "', '" +
      this.status +
      "', '" +
      this.totalPrice +
      "', '" +
      this.numberPeople +
      "', '" +
      this.numberChildren +
      "', '" +
      this.address +
      "', '" +
      this.phone +
      "', '" +
      this.email +
      "', '" +
      this.notes +
      "', '" +
      this.idAccount +
      "') ",
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

Order.getOrderById = function(idOrder, funcResult) {
  mysql.query(
    "SELECT * FROM kinhdoanhtourdulich.orders  WHERE idOrder = ? ;",
    [idOrder],
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

Order.getOrderByIdWithIdAccount = function(idOrder, idAccount, funcResult) {
  mysql.query(
    "SELECT * FROM kinhdoanhtourdulich.orders  WHERE idOrder = ? AND idAccount = ? ;",
    [idOrder, idAccount],
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

Order.updateById = function(updateOrder, funcResult) {
  mysql.query(
    "UPDATE kinhdoanhtourdulich.orders SET ? WHERE (idOrder = ?);",
    [updateOrder, updateOrder.idOrder],
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

Order.remove = function(idOrder, funcResult) {
  mysql.query(
    "DELETE FROM kinhdoanhtourdulich.orders WHERE idOrder = ?",
    [idOrder],
    function(err, res) {
      if (err) {
        funcResult(err, null);
      } else {
        funcResult(null, res);
      }
    }
  );
};

module.exports = Order;