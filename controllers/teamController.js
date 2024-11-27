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
  return res.status(201).json({ message: "Team created succesfully", newTeam})
 } catch(error) {
  console.error("Error creating team", error.message)
  res.status(500).json({ message: "Error creating team", error: error.message })
 }
};

export const getAllTeam = async (req, res) => {
  try {
    const team = await Team.findAll();
    if (!team) {
      return res.status(404).json({ message: "Teams not found"})
    }
  return res.status(201).json({ message: "Teams found", team})
  } catch(error) {
    console.error("Error fetching teams", error.message)
    res.status(500).json({ message: "Error fetching teams", error: error.message })
  }
};

export const getTeam = async (req, res) => {
  const {id} = req.params;
  try {
    const team = await Team.findOne({where: {id}})
    if (!team) {
      return res.status(404).json({ message: `Team with id:${id} not found` })
    }
  return res.status(201).json({ message: "Team found", team })
  } catch(error) {
    console.error("Error fetching team", error.message)
    res.status(500).json({ message: "Error fetching team", error: error.message })
  }
};

export const updateTeam = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  try {
    const team = await Team.findOne({where: {id}});
    if(!team) {
      return res.status(404).json({ message: `Team with id:${id} not found` })
    }
    await team.update({ name });
    return res.status(200).json( {
      message: "Team successfully updated",
      team: { id: team.id, name: team.name }})
  } catch(error) {
    console.error("Error updating team", error.message)
    res.status(500).json({ message: "Error updating team", error: error.message })
  }
};

export const deleteTeam = async (req, res) => {
  const {id} = req.params;
try {
  const team = await Team.findOne({where: {id}})
  if(!team) {
    return res.status(404).json({message: `Team with id:${id} not found`})
  }
  await team.destroy();
  return res.status(200).json(
  {message: "Team deleted successfully",
    team: {team: team.name}
  })
} catch(error) {
  console.error(`Error deleting team with id:${id}`, error.message)
  res.status(500).json({ message: "Error deleting team", error: error.message})
}
};