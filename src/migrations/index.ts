import * as migration_20250124_123929_init from './20250124_123929_init';
import * as migration_20250124_123958_composition_name_indexs from './20250124_123958_composition_name_indexs';
import * as migration_20250124_125657 from './20250124_125657';
import * as migration_20250124_125706 from './20250124_125706';
import * as migration_20250125_193602_search from './20250125_193602_search';
import * as migration_20250126_155042 from './20250126_155042';

export const migrations = [
  {
    up: migration_20250124_123929_init.up,
    down: migration_20250124_123929_init.down,
    name: '20250124_123929_init',
  },
  {
    up: migration_20250124_123958_composition_name_indexs.up,
    down: migration_20250124_123958_composition_name_indexs.down,
    name: '20250124_123958_composition_name_indexs',
  },
  {
    up: migration_20250124_125657.up,
    down: migration_20250124_125657.down,
    name: '20250124_125657',
  },
  {
    up: migration_20250124_125706.up,
    down: migration_20250124_125706.down,
    name: '20250124_125706',
  },
  {
    up: migration_20250125_193602_search.up,
    down: migration_20250125_193602_search.down,
    name: '20250125_193602_search',
  },
  {
    up: migration_20250126_155042.up,
    down: migration_20250126_155042.down,
    name: '20250126_155042'
  },
];
