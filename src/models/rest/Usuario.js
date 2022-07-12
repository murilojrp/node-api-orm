const usuario = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'usuarios',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Usuario.sync();
  return Usuario;
};

export default usuario;
