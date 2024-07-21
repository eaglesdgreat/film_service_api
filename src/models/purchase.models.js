module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    "purchases",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      amount_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true },
  )
  
  return Purchase;
}
