/**
 * Configuration Exports
 */

// Sectors config (legacy)
export { 
  type Sector,
  SECTORS,
  getSectorById,
  getEnabledSectors,
  getComingSoonSectors,
  getActiveSectors
} from './sectors';

// Navigation config (new)
export * from './navigation';
