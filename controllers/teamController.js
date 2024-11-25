import Team from '../models/team.js';


export const createTeam = async (req, res) => {
 const {name} = req.body;

 if (!name) {
   return res.status(400).json({ message: "Team name required" });
  }

 try{
  const newTeam = await Team.create({
   name,
  });
  res.status(201).json({ message: "Team created succesfully", newTeam})
 } catch(error) {
  console.error("Error creating team", error.message)
  res.status(500).json({ message: "Error creating team", error: error.message })
 }
};