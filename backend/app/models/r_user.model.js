module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("r_users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    name_company:{
        type:Sequelize.STRING,
        allowNull:true,
    },

    creationdate:{
        type:Sequelize.DATE,
        allowNull:true,
    },

    city:{
        type:Sequelize.STRING,
        allowNull:true,
    },

    logo:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    location:{
        type:Sequelize.STRING,
        allowNull:true,
    },

    });
  
    return User;
  };