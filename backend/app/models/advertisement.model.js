module.exports = (sequelize, Sequelize) => {
  const Advertisement = sequelize.define("advertisement", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    
  experience:{
      type:Sequelize.STRING,
      allowNull:true,

  },
  description:{
      type:Sequelize.STRING,
      allowNull:true,

  },

  location:{
      type:Sequelize.STRING,
      allowNull:true,
  },

  contrat:{
      type:Sequelize.STRING,
      allowNull:true,
  },

  remote:{
      type:Sequelize.BOOLEAN,
      allowNull:true,
  },

  salarie:{
      type:Sequelize.INTEGER,
      allowNull:true,
  },
  });

  return Advertisement;
};
