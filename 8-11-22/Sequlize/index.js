const sequelize = require("./connection/connect");

const Customer = require("./models/customer");
const Order = require("./models/order");

Customer.hasMany(Order);

let customerId = null;
sequelize
  .sync({force: true})
  // .sync()
  .then((result) => {
    return Customer.create({name: "Thrushitha", email: "manepalli@gmail.com"})
    console.log(result);
  })
  .then((result1) => {
    return Customer.create({name: "Jashrutha", email: "manepalli1@gmail.com"})
    console.log(result1);
  })
  .then(customer => {
    customerId = customer.id;
    console.log("First Customer Created: ",customer);
    return customer.createOrder({total: 45});
  })
  .then(order => {
    console.log("Order is : ",order);
    return Order.findAll({ where: customerId});
  })
  .then(orders => {
    console.log("All the Orders are : ",orders);
  })
  .catch((err) => {
    console.log(err);
  });
