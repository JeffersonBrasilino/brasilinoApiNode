export let  databases = {
  dev: {
    host: "192.168.0.105",
    port: "4000",
    username: "brasilino",
    password: "jeffdrummer",
    database: "petinder",
    dialect: "postgres",
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 2,
      min: 0,
      idle: 1000,
      handleDisconnects: true
    }
  },
  prod: {
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    port: "5432",
    username: "vzwvddprxzdglw",
    password: "109e8ae6bd956f2386bbcf842e663873d5ab14436269757b34bdd5eee16f9365",
    database: "d2a7vub93kgnum",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: 2,
      min: 0,
      idle: 1000,
      handleDisconnects: true
    }
  }
}