import Player from '../models/player.js';
import Team from '../models/team.js';


export const createPlayer = async (req, res) => {
 const {firstName, lastName, teamId} = req.body;
//Pre-validation before hitting the database
if (!firstName || !lastName) {
 return res.status(400).json({ message: "First name and last name are required" });
}
try {
 const player = await Player.create({
  firstName,
  lastName,
  teamId: teamId || null,
 });
 res.status(201).json({ message: "Player created successfully", player })
} catch(error) {
 console.error("Error creating player", error.message)
 res.status(500).json({ message: "Error creating player", error: error.message })
}
};



export const getAllPlayer = async (req, res) => {
 try {
  const players = await Player.findAll({
   include: [
    {
     model: Team,
     as: 'team',
     attributes: ['id', 'name'],
    },
   ],
  });
  if (!players || players.length === 0) {
  return res.status(404).json({ message: "No players found" })
 };
  res.status(200).json({ message: "Players Found", players });
 } catch(error) {
  console.error("Error fetching players", error.message);
  res.status(500).json({ messsage: "Error fetching players", error: error.message })
 }
};



export const getPlayer = async (req, res) => {
 const {id} = req.params;
 try {
  const player = await Player.findOne({where: {id},
  include: [
  {
   model: Team,
   as: 'team',
   attributes: ['id', 'name'],
  },
  ],
 });
  if (!player) {
   res.status(401).json({ message: "Player not found" })
  };
  res.status(201).json({ message: "Player found", player})
 } catch(error) {
  console.error("Error fetching player", error.message);
  res.status(500).json({ message: "Error fetching player", error: error.message})
 }
};




export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, teamId } = req.body;

  try {
    const player = await Player.findOne({ where: { id } });
    if (!player) {
      return res.status(404).json({ message: `Player with id:${id} not found` });
    }

    if (teamId) {
      if (isNaN(teamId)) {
        return res.status(400).json({ message: "Invalid teamId format. Must be a number." });
      }
      const team = await Team.findOne({ where: { id: teamId } });
      if (!team) {
        return res.status(400).json({ message: `Team with id:${teamId} does not exist` });
      }
    }

    await player.update({
      firstName,
      lastName,
      ...(teamId !== undefined && { teamId }), // Only update teamId if provided
    });

    // Refetch the updated player with the team relationship
    const updatedPlayer = await Player.findOne({
      where: { id },
      include: [
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name'], // Include only necessary team attributes
        },
      ],
    });

    return res.status(200).json({
      message: "Player updated successfully",
      player: updatedPlayer, // Return the fully updated player with the team
    });
  } catch (error) {
    console.error("Error updating player", error.message);
    res
      .status(500)
      .json({ message: `Error updating player with id:${id}`, error: error.message });
  }
};





export const deletePlayer = async (req, res) => {
 const {id} = req.params;
 try {
  const player = await Player.findOne({where: {id}})
  if(!player) {
  return res.status(404).json({ message: `Player with id:${id} not found`})
  }
  await player.destroy();
  return res.status(200).json({ message: 'Player deleted successfully',
  player: { id: player.id, firstName: player.firstName, lastName: player.lastName }})
 } catch(error) {
  console.error(`Error deleting player with id:${id}`, error.message)
  res.status(500).json({ message: `Error deleting player with id:${id}`, error: error.message })
 }
};