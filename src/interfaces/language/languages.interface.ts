interface ILanguage {
  id: string;
  name: string;
}
export type ILanguages = ILanguage[];

interface ICountLanguage {
  count: number;
  name: string;
}

export type ICountLanguages = ICountLanguage[];
