import Player from './player.js';
import Team from './team.js';

export default function setupAssociations() {
  // Define relationships
  Team.hasMany(Player, { foreignKey: 'teamId', as: 'players' });
  Player.belongsTo(Team, { foreignKey: 'teamId', as: 'team'});
}
