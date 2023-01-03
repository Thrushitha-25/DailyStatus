module.exports = (sequelize, Sequelize) => {
    const Sign = sequelize.define("sign", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Hello;
  };
  