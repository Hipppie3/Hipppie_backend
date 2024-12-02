import Player from './player.js';
import Team from './team.js';
import Sport from './sport.js'

export default function setupAssociations() {
  // Define relationships

  Sport.hasMany(Player, {foreignKey: 'sportId', as: 'players'});
  Sport.hasMany(Team, {foreignKey: 'sportId', as: 'teams'})

  Team.hasMany(Player, { foreignKey: 'teamId', as: 'players' });
  Team.belongsTo(Sport, {foreignKey: 'sportId', as: 'sport'});
  
  Player.belongsTo(Team, { foreignKey: 'teamId', as: 'team'});
  Player.belongsTo(Sport, {foreignKey: 'sportId', as: 'sport'});
}
