import { pool } from "../config/database.js";

/** GET /cars */
const getCars = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id, 
        name, 
        price, 
        exterior, 
        exteriorimage AS "exteriorImage",
        wheels, 
        wheelsimage AS "wheelsImage", 
        roof, 
        roofimage AS "roofImage",
        interior, 
        interiorimage AS "interiorImage"
      FROM cars
      ORDER BY id ASC;
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

/** GET /cars/:id */
const getCarById = async (req, res) => {
  try {
    const selectQuery = `
       SELECT
        id, 
        name, 
        price, 
        exterior, 
        exteriorimage AS "exteriorImage",
        wheels, 
        wheelsimage AS "wheelsImage", 
        roof, 
        roofimage AS "roofImage",
        interior, 
        interiorimage AS "interiorImage"
      FROM cars
      WHERE id = $1
    `;
    const { id } = req.params;
    const results = await pool.query(selectQuery, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

/** POST /cars */
const createCar = async (req, res) => {
  const {
    name,
    price,
    exterior,
    exteriorImage,
    wheels,
    wheelsImage,
    roof,
    roofImage,
    interior,
    interiorImage,
  } = req.body;

  if (!name || !price || !exterior || !wheels || !roof || !interior) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO cars (
     name, price, exterior, exteriorimage,
     wheels, wheelsimage, roof, roofimage,
     interior, interiorimage
   )
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
   RETURNING
     id, name, price, exterior,
     exteriorimage AS "exteriorImage",
     wheels, wheelsimage AS "wheelsImage",
     roof, roofimage AS "roofImage",
     interior, interiorimage AS "interiorImage";`,
      [
        name,
        price,
        exterior,
        exteriorImage ?? null,
        wheels,
        wheelsImage ?? null,
        roof,
        roofImage ?? null,
        interior,
        interiorImage ?? null,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createCar:", err);
    res.status(500).json({ error: "Failed to create car" });
  }
};

/** PUT /cars/:id */
const updateCar = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    exterior,
    exteriorImage,
    wheels,
    wheelsImage,
    roof,
    roofImage,
    interior,
    interiorImage,
  } = req.body;

  if (!name || !price || !exterior || !wheels || !roof || !interior) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE cars SET
     name=$1, price=$2, exterior=$3, exteriorimage=$4,
     wheels=$5, wheelsimage=$6, roof=$7, roofimage=$8,
     interior=$9, interiorimage=$10
   WHERE id=$11
   RETURNING
     id, name, price, exterior,
     exteriorimage AS "exteriorImage",
     wheels, wheelsimage AS "wheelsImage",
     roof, roofimage AS "roofImage",
     interior, interiorimage AS "interiorImage";`,
      [
        name,
        price,
        exterior,
        exteriorImage ?? null,
        wheels,
        wheelsImage ?? null,
        roof,
        roofImage ?? null,
        interior,
        interiorImage ?? null,
        id,
      ]
    );
    if (!rows.length) return res.status(404).json({ error: "Car not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("updateCar:", err);
    res.status(500).json({ error: "Failed to update car" });
  }
};

/** DELETE /cars/:id */
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM cars WHERE id=$1`, [id]);
    if (!rowCount) return res.status(404).json({ error: "Car not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteCar:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
};

export default { getCars, getCarById, createCar, updateCar, deleteCar };
