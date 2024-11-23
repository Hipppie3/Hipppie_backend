import Player from '../models/player.js';


export const createPlayer = async (req, res) => {
 const {firstName, lastName} = req.body;

//Pre-validation before hitting the database
if (!firstName || !lastName) {
 return res.status(400).json({ message: "First name and last name are required" });
}

try {
 const newPlayer = await Player.create({
  firstName,
  lastName
 });
 res.status(201).json({ message: "Player created successfully", newPlayer })
} catch(error) {
 console.error("Error creating player", error.message)
 res.status(500).json({ message: "Error creating player", error: error.message })
}
};

export const getAllPlayer = async (req, res) => {
 try {
  const players = await Player.findAll();

  if (!players || players.length === 0) {
  return res.status(404).json({ message: "No players found" })
 };
 
  res.status(200).json({ message: "Players Found", players });
 } catch(error) {
  console.log("Error fetching all players", error.message);
  res.status(500).json({ messsage: "Error fetching all players", error: error.message })
 }
};