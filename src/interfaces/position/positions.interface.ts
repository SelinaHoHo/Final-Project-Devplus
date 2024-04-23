interface IPosition {
  id: string;
  name: string;
  description: string;
  level: number;
}

export interface IPositionCreate {
  name: string;
  description: string;
  level: number;
}

export type IPositions = IPosition[];
export default IPosition;
