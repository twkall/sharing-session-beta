import * as migration_20240814_061113_initial from './20240814_061113_initial';

export const migrations = [
  {
    up: migration_20240814_061113_initial.up,
    down: migration_20240814_061113_initial.down,
    name: '20240814_061113_initial'
  },
];
