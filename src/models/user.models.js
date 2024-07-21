module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
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
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            // args: true,
            meg: "invalid email"
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "User"
      }
    },
    { timestamps: true },
  )
  
  return User;
}
