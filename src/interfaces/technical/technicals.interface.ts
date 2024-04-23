import React from "react";

interface ITechnical {
  id: string;
  name: string;
}

export interface ITechnicalCreate {
  name: string;
}

export interface IDataType {
  key: React.Key;
  id: string;
  name: string;
}

export type ITechnicals = ITechnical[];
export default ITechnical;
