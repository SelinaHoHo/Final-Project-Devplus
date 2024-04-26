interface ITechnical {
  id: string;
  name: string;
}

export type ITechnicals = ITechnical[];

interface ICountTechnical {
  name: string;
  count: number;
}
export type ICountTechnicals = ICountTechnical[];
