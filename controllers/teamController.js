import Team from '../models/team.js';
import Player from '../models/player.js';
import Sport from '../models/sport.js';


export const createTeam = async (req, res) => {
 const {name, sportId} = req.body;

 if (!name) {
   return res.status(400).json({ message: "Team name required" });
  }

 try{
  const team = await Team.create({
   name,
   sportId,
  });
  return res.status(201).json({ message: "Team created succesfully", team})
 } catch(error) {
  console.error("Error creating team", error.message)
  res.status(500).json({ message: "Error creating team", error: error.message })
 }
};

export const getAllTeam = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Player,
          as: 'players',
          required: false,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Sport,
          as: 'sport',
          required: false,
          attributes: ['id', 'name']
        },
      ],
    });

    if (!teams) {
      return res.status(404).json({ message: "Teams not found"})
    }
  return res.status(201).json({ message: "Teams found", teams})
  } catch(error) {
    console.error("Error fetching teams", error.message)
    res.status(500).json({ message: "Error fetching teams", error: error.message })
  }
};

export const getTeam = async (req, res) => {
  const {id} = req.params;
  try {
    const team = await Team.findOne({
      where: {id},
      include: [
        {
          model: Player,
          as: 'players',
          required: false,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Sport,
          as: 'sport',
          attributes: ['id', 'name']
        },
      ],
    });

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
  const {name, sportId} = req.body;
  try {
    const team = await Team.findOne({where: {id}});
    if(!team) {
      return res.status(404).json({ message: `Team with id:${id} not found` })
    }
    await team.update({ name, sportId });
    return res.status(200).json( {
      message: "Team successfully updated",
      team: { id: team.id, name: team.name, sportId: team.sportId }})
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