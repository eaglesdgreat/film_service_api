module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define(
    "films",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true },
  )
  
  return Film;
}
