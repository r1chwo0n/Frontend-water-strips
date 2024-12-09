import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import { dbClient } from "@db/client";
import { stripsTable, usersTable } from "@db/schema";
import { eq } from "drizzle-orm";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // เก็บไฟล์ในโฟลเดอร์ uploads
// Initialize the express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json()); // Parse incoming JSON requests

// =================== USERS API ===================

// Get All from usersTable
app.get("/users", async (req, res, next) => {
  try {
    const results = await dbClient.query.usersTable.findMany();
    res.json(results);
  } catch (err) {
    next(err);
  }
});


// Insert into usersTable
app.put("/users", async (req, res, next) => {
  try {
    const { u_name, u_email, u_password } = req.body;
    if (!u_name || !u_email || !u_password) throw new Error("Missing user data");

    const result = await dbClient
      .insert(usersTable)
      .values({ u_name, u_email, u_password })
      .returning();
    
    res.json({ msg: "User inserted successfully", data: result });
  } catch (err) {
    next(err);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { u_name, u_email, u_password } = req.body;

    // Check for missing fields
    if (!u_name || !u_email || !u_password) {
      throw new Error("Missing required fields: u_name, u_email, u_password");
    }

    // Insert new user
    const result = await dbClient
      .insert(usersTable)
      .values({ u_name, u_email, u_password })
      .returning(); // Returns inserted values

    res.status(201).json({
      msg: "User created successfully",
      data: result[0], // Return the first item from result
    });
  } catch (err) {
    next(err);
  }
});

// Update user in usersTable by id
app.patch("/users/:id", async (req, res, next) => {
  try {
    const u_id = parseInt(req.params.id);
    const { u_name, u_email, u_password } = req.body;
    if (!u_name && !u_email && !u_password) throw new Error("No data to update");

    const result = await dbClient
      .update(usersTable)
      .set({ u_name, u_email, u_password })
      .where(eq(usersTable.u_id, u_id))
      .returning();
    
    res.json({ msg: "User updated successfully", data: result });
  } catch (err) {
    next(err);
  }
});

// Delete user in userTable by id
app.delete("/users/:id", async (req, res, next) => {
  try {
    const u_id = parseInt(req.params.id);
    if (!u_id) throw new Error("Missing user id");

    const results = await dbClient.query.usersTable.findMany({
      where: eq(usersTable.u_id, u_id),
    });
    if (results.length === 0) throw new Error("User not found");

    await dbClient.delete(usersTable).where(eq(usersTable.u_id, u_id));
    res.json({ msg: "User deleted successfully", data: { u_id } });
  } catch (err) {
    next(err);
  }
});


// =================== STRIPS API ===================

// Get All from stripsTable
app.get("/strips", async (req, res, next) => {
  try {
    const results = await dbClient.query.stripsTable.findMany();
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Insert into stripsTable (update ?)
app.put("/strips", async (req, res, next) => {
  try {
    const { s_url, u_id, s_brand, s_location, s_ph } = req.body;
    if (!s_url || !u_id || !s_brand || !s_location || s_ph === undefined) throw new Error("Missing strip data");

    const result = await dbClient
      .insert(stripsTable)
      .values({ s_url, u_id, s_brand, s_location, s_ph })
      .returning();
    
    res.json({ msg: "Strip inserted successfully", data: result });
  } catch (err) {
    next(err);
  }
});

// Insert into stripsTable
app.post("/strips", async (req, res, next) => {
  try {
    const { s_url, u_id, s_brand, s_location, s_ph } = req.body;

    // Check for missing fields
    if (!s_url || !u_id || !s_brand || !s_location || s_ph === undefined) {
      throw new Error("Missing required fields: s_url, u_id, s_brand, s_location, s_ph");
    }

    // Insert new strip
    const result = await dbClient
      .insert(stripsTable)
      .values({ s_url, u_id, s_brand, s_location, s_ph })
      .returning(); // Returns inserted values

    res.status(201).json({
      msg: "Strip created successfully",
      data: result[0], // Return the first item from result
    });
  } catch (err) {
    next(err);
  }
});

// Update strip in stripsTable
app.patch("/strips/:id", async (req, res, next) => {
  try {
    const s_id = parseInt(req.params.id);
    const { s_url, u_id, s_brand, s_location, s_ph } = req.body;
    if (!s_url && !u_id && !s_brand && !s_location && s_ph === undefined) throw new Error("No data to update");

    const result = await dbClient
      .update(stripsTable)
      .set({ s_url, u_id, s_brand, s_location, s_ph })
      .where(eq(stripsTable.s_id, s_id))
      .returning();
    
    res.json({ msg: "Strip updated successfully", data: result });
  } catch (err) {
    next(err);
  }
});

// Delete strip from stripsTable
app.delete("/strips/:id", async (req, res, next) => {
  try {
    const s_id = parseInt(req.params.id);
    if (!s_id) throw new Error("Missing strip id");

    const results = await dbClient.query.stripsTable.findMany({
      where: eq(stripsTable.s_id, s_id),
    });
    if (results.length === 0) throw new Error("Strip not found");

    await dbClient.delete(stripsTable).where(eq(stripsTable.s_id, s_id));
    res.json({ msg: "Strip deleted successfully", data: { s_id } });
  } catch (err) {
    next(err);
  }
});

// =================== Error Handler ===================
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let serializedError = JSON.stringify(err, Object.getOwnPropertyNames(err));
  serializedError = serializedError.replace(/\/+/g, "/").replace(/\\+/g, "/");
  res.status(500).send({ error: serializedError });
};
app.use(jsonErrorHandler);

// =================== Server ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

