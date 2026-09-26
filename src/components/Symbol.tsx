import type { HabitatSymbol } from '../model';
const paths:Record<HabitatSymbol|'Trap',string>={
Trap:'M-11 7C-25 -2 -19 -22 0 -22C19 -22 25 -2 11 7V17H-11Z M-11 7H11 M-5 8V17 M5 8V17 M-11 -5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 -5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M0 -1L-3 4H3Z',
Shadowblighted:'M0 -17L5 -6L16 -9L10 1L16 12L4 9L0 18L-4 9L-16 12L-10 1L-16 -9L-5 -6Z M-5 -1L-2 2 M5 -1L2 2',
Underground:'M-18 14Q-18 -17 0 -17Q18 -17 18 14L8 14Q10 -5 0 -6Q-10 -5 -8 14Z',
Aquatic:'M-20 -10Q-15 -17 -10 -10T0 -10T10 -10T20 -10 M-20 0Q-15 -7 -10 0T0 0T10 0T20 0 M-20 10Q-15 3 -10 10T0 10T10 10T20 10',
Wetland:'M-18 13H18 M-10 12V-12 M0 12V-18 M10 12V-8 M-13 -14V-6 M-3 -18V-10 M7 -10V-3 M-10 7L-17 0 M0 6L6 0',
Grassland:'M-16 13Q-12 0 -19 -8 M-9 13Q-4 -3 -9 -17 M0 13Q-2 -2 5 -14 M7 13Q10 0 17 -5 M-20 14H20',
Tropical:'M-3 17Q3 0 0 -10 M0 -10Q-16 -22 -20 -5Q-10 -13 0 -10 M0 -10Q15 -23 21 -7Q12 -13 0 -10 M0 -10Q7 -2 12 2 M-10 17H8',
Forest:'M-3 16V5 M3 16V5 M-12 16H12 M-10 5C-25 5 -19 -10 -11 -9C-13 -23 8 -23 10 -12C23 -12 24 5 11 5Z',
Drylands:'M-3 17V-15Q0 -21 3 -15V17 M-3 3H-13Q-17 3 -17 -2V-9 M3 -3H12Q17 -3 17 -8V-13 M-10 17H10',
Rolling:'M-22 12Q-10 -13 3 9 M-3 12Q11 -10 23 12',
Mountain:'M-22 15L-7 -17L9 15 M0 -2L9 -15L24 15 M-12 -6L-7 -2L-3 -7',
Frozen:'M0 -20V20 M-17 -10L17 10 M-17 10L17 -10 M-5 -15L0 -10L5 -15 M-5 15L0 10L5 15 M-15 -3L-9 -5L-10 -12 M15 3L9 5L10 12 M-15 3L-9 5L-10 12 M15 -3L9 -5L10 -12',
Badlands:'M-23 15L-13 -6L-7 0L-1 -14L5 -3L12 -8L23 15 M-4 -19L-8 -25 M5 -18L9 -24'
};
export function Symbol({habitat,terrain,size=1}:{habitat:HabitatSymbol|'Trap';terrain:number;size?:number}) {return <g transform={`scale(${size})`} stroke="#151513" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d={paths[habitat]}/>{Array.from({length:habitat==='Trap'?0:terrain},(_,i)=><circle key={i} cx={(i-(terrain-1)/2)*9} cy={29} r={2.8} fill="#151513" stroke="none"/>)}</g>;}

