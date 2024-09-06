const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "qwipo.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4001, () => {
      console.log("Server Running at http://localhost:4001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.post("/register", async (request, response) => {
  const { first_name, last_name, phone, email, address1, address2 } = request.body;

  const selectUserQuery = `SELECT * FROM customer WHERE email = '${email}'`;
  const dbUser = await db.get(selectUserQuery);

  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        customer (first_name, last_name, phone, email, address1, address2) 
      VALUES 
        ('${first_name}', '${last_name}', ${phone}, '${email}', '${address1}', '${address2}')
    `;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.status(200).send({ message: "User created successfully", userId: newUserId });
  } else {
    response.status(400).send({ message: "User already exists" });
  }
});

app.get("/user/", async (request, response) => {
  const getUsersQuery = `
    SELECT * FROM customer ORDER BY id;
  `;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray);
});

app.delete("/user/:userId/", async (request, response) => {
  const { userId } = request.params;
  const deleteQuery = `DELETE FROM customer WHERE id = ${userId};`;
  await db.run(deleteQuery);
  response.send({ message: "User deleted successfully" });
});

app.put("/update/:userId", async (request, response) => {
  const { first_name, last_name, phone, email, address1, address2 } = request.body;
  const { userId } = request.params;

  const selectUserQuery = `SELECT * FROM customer WHERE id = ${userId}`;
  const dbUser = await db.get(selectUserQuery);

  if (dbUser === undefined) {
    response.status(404).send({ message: "User not found" });
  } else {
    const updateUserQuery = `
      UPDATE customer
      SET first_name = '${first_name}', last_name = '${last_name}', phone = ${phone}, email = '${email}', 
      address1 = '${address1}', address2 = '${address2}'
      WHERE id = ${userId}
    `;
    await db.run(updateUserQuery);
    response.status(200).send({ message: "User updated successfully" });
  }
});
