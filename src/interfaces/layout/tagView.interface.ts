export type TagItem = {
  code: string;

  label: string;

  path: string;

  closable: boolean;
};

export interface TagState {
  tags: TagItem[];
  name: string;
  namePrj: string;
  activeTagId: TagItem["path"];
}
