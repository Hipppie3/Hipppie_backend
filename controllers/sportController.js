import Sport from '../models/sport.js';

export const createSport = async (req, res) => {
 const {name} = req.body;
   if(!name) {
   return res.status(400).json({ message: 'Invalid sport name' });
  }
  try {
   const sport = await Sport.create({name});
   return res.status(201).json({ message: 'Sport created successfully', sport})
  } catch(error) {
   console.error('Error adding sport:', error);
   return res.status(500).json({ message: 'Failed to add sport'})
  }
 };

export const getAllSport = async (req, res) => {
 try {
  const sports = await Sport.findAll()
  if (!sports || sports.length === 0) {
   return res.status(404).json({ message: "No sports found"})
  };
  return res.status(200).json({ message: "Sport Found", sports });
 } catch(error) {
  console.error("Error fetching sports", error.message)
  return res.status(500).json({ message: "Error fetching sports", error: error.message})
 }
};

export const getSport = async (req, res) => {
 const {id} = req.params;
 try {
  const sport = await Sport.findOne({where: {id}});
  if (!sport) {
   return res.status(401).json({ message: "Sport not found" })
  };
  return res.status(201).json({ message: "Sport found", sport})
 } catch(error) {
  console.error("Error fetching sport", error.message);
  return res.status(500).json({ message: "Error fetching sport", error: error.message})
 }
};

export const deleteSport = async (req, res) => {
 const {id} = req.params;
 try {
  const sport = await Sport.findOne({where: {id}});
  if (!sport) {
   return res.status(404).json({ message: `Sport with id:${id} not found`})
  }
  await sport.destroy();
  return res.status(200).json({ message: 'Player deleted',
   sport: { id: sport.id, name: sport.name }})
 } catch(error) {
  console.error(`Error deleting sport with id:${id}`, error.message)
  res.status(500).json({ message: `Error deleting player with id:${id}`, error: error.message })
 }
};