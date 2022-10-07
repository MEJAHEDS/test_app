module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name:{
        type:Sequelize.STRING,
        allowNull:true,
        validate:{
            noEmpty:true
        }
    },
    firstName:{
      type:Sequelize.STRING,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  postalCode:{
      type:Sequelize.INTEGER,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  address:{
      type:Sequelize.STRING,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  city:{
      type:Sequelize.STRING,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  phone:{
      type:Sequelize.INTEGER,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  cv:{
      type:Sequelize.STRING,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },
  profilePic:{
      type:Sequelize.STRING,
      allowNull:true,
      validate:{
          noEmpty:true
      }
  },

    });
  
    return User;
  };