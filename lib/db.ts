import mysql, { Connection } from "mysql2/promise";

let db: Connection | undefined;

export async function connectToDatabase(): Promise<Connection> {
  if (!db) {
    db = await mysql.createConnection({
      host: process.env.DB_HOST as string,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
    });

    await initializeDatabase(db);
  }
  return db;
}

async function initializeDatabase(db: Connection) {
  // Create 'events' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      format VARCHAR(255) NOT NULL,
      eventDate JSON,
      note VARCHAR(255),
      status VARCHAR(255) DEFAULT '非公開',
      statusBit INT DEFAULT 0,
      priority TINYINT DEFAULT 0,
      prefecture VARCHAR(255),
      address1 VARCHAR(255),
      address2 VARCHAR(255),
      hiddenAddress VARCHAR(255),
      mapFormat VARCHAR(255) DEFAULT '地図にピンを表示する',
      mailFormat VARCHAR(255) DEFAULT '住所を全て記載する',
      images VARCHAR(255),
      mainIndex INT DEFAULT 0,
      FPImages VARCHAR(255),
      tag VARCHAR(255),
      feature LONGTEXT,
      benefit LONGTEXT,
      propertyType VARCHAR(255) DEFAULT '設定しない',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )
`);

  // Create 'campaign' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      format VARCHAR(255) NOT NULL,
      eventDate JSON,
      status VARCHAR(255) DEFAULT '非公開',
      statusBit INT DEFAULT 0,
      prefecture VARCHAR(255),
      address1 VARCHAR(255),
      address2 VARCHAR(255),
      hiddenAddress VARCHAR(255),
      mapFormat VARCHAR(255) DEFAULT '地図にピンを表示する',
      featuredEvent VARCHAR(255),
      images VARCHAR(255),
      mainIndex INT DEFAULT 0,
      article VARCHAR(1000),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )
  `);

  // Create 'customers' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      status VARCHAR(255) DEFAULT '未設定',
      route VARCHAR(255) DEFAULT '予約',

      lastName VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      seiName VARCHAR(255) NOT NULL,
      meiName VARCHAR(255) NOT NULL,

      zipCode VARCHAR(255) NOT NULL,
      prefecture VARCHAR(255),
      city VARCHAR(255),
      street VARCHAR(255),
      building VARCHAR(255),

      email VARCHAR(255),
      phone VARCHAR(255),
      birthYear INT,
      birthMonth INT,
      birthDate INT,

      moment VARCHAR(255),
      note VARCHAR(255),
      memo VARCHAR(255),
      employee VARCHAR(255),
      delivery VARCHAR(255) NOT NULL DEFAULT '未確認',

      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )
  `);

  // Create 'reservations' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      customerId INT,
      eventId INT,
      reserveDate VARCHAR(255),
      startTime VARCHAR(255),
      endTime VARCHAR(255),
      status VARCHAR(255),
      route VARCHAR(255) DEFAULT '手入力',
      receptionAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      canceledAt TIMESTAMP NULL
    )
  `);

  // Create 'accounts' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      approved INT DEFAULT 0,
      isAdmin INT DEFAULT 0,
      privilege VARCHAR(255),

      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(255),
      password VARCHAR(255),
      
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )
  `);

  // Create 'users' table if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      name VARCHAR(255),
      abbreviation VARCHAR(255),
      type VARCHAR(255),
      email VARCHAR(255),
      zipCode VARCHAR(255),
      prefecture VARCHAR(255),
      address VARCHAR(255),
      phone VARCHAR(255),
      fax VARCHAR(255),
      holidays VARCHAR(255),
      websiteURL VARCHAR(255),
      password VARCHAR(255),

      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )
  `);
}
