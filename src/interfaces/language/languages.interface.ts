interface ILanguage {
  id: string;
  name: string;
  description: string;
  level: number;
}
export interface ILanguageCreate {
  name: string;
  description: string;
  level: number;
}
export type ILanguages = ILanguage[];
export default ILanguage;
