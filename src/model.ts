import type { FoundryConfig } from './foundryModule/types';
export interface HexCoordinate { q: number; r: number }
export interface GridSettings { foundryEven?: boolean; size: number; offsetX: number; offsetY: number; orientation: 'pointy' | 'flat' | 'square'; opacity: number; thickness: number; visible: boolean }
export type HabitatSymbol = 'Shadowblighted' | 'Underground' | 'Aquatic' | 'Wetland' | 'Grassland' | 'Tropical' | 'Forest' | 'Drylands' | 'Rolling' | 'Mountain' | 'Frozen' | 'Badlands';
export type Habitat = string;
export interface Region { kind?: 'terrain'|'trap'; encounterRule?: import('./foundryModule/types').EncounterRule; id: string; name: string; hexes: HexCoordinate[]; habitat: Habitat; terrain: number; notes: string; symbolHex?: HexCoordinate; targetSize?: number; encounter?: string; feature?: string }
export interface MapMarker { alertMode?: 'radius'|'region'; radiusHexes?: number; alertEnabled?: boolean; id: string; x: number; y: number; title: string; description: string; notes: string; hidden: boolean; kind: string }
export interface RollTableEntry { id?: string; enabled?: boolean; min: number; max: number; name: string; description?: string; color?: string; symbol?: HabitatSymbol; value?: number; days?: number; combine?: boolean }
export interface MapProject { foundry?: FoundryConfig; version: 1; imageMetadata: { name: string; width: number; height: number; dataUrl?: string }; grid: GridSettings; regions: Region[]; markers: MapMarker[]; labels: MapMarker[]; view?: { backgroundOpacity: number; showRegions: boolean; regionOpacity: number }; playerToken?: HexCoordinate; generatorTables: { size: RollTableEntry[]; feature: RollTableEntry[]; habitat?: RollTableEntry[]; terrain?: RollTableEntry[]; encounter?: RollTableEntry[] } }
export const initialProject: MapProject = { version: 1, imageMetadata: { name: 'Untitled wilderness', width: 1400, height: 1000 }, grid: { size: 48, offsetX: 0, offsetY: 0, orientation: 'pointy', opacity: .23, thickness: 1, visible: true }, regions: [], markers: [], labels: [], generatorTables: { size: [{ min: 1, max: 4, name: '3' }, { min: 5, max: 8, name: '5' }, { min: 9, max: 12, name: '7' }], feature: [{ min: 1, max: 100, name: 'Uncharted feature — add your own table' }] } };





