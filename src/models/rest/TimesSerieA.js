const timesSerieA= (sequelize, DataTypes) => {
    const TimesSerieA= sequelize.define(
      'timesSerieA',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
        },
        tecnico: {
          type: DataTypes.STRING,
        },
        anoFundacao: {
          type: DataTypes.INTEGER,
        },
        posicao: {
          type: DataTypes.STRING,
          unique: true,
        },
        pontos: {
          type: DataTypes.INTEGER,
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    TimesSerieA.sync();
    return TimesSerieA;
  };
  
  export default timesSerieA;