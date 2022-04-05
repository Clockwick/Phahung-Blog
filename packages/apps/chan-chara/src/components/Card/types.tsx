export interface IResult {
  title: string;
  description: string;
  image: string;
  alt: string;
  id: string;
  time: number;
}

export type CardObj = {
  title: string;
  description: string;
  image: string;
  alt?: string;
  id: string;
  time: number;
};

export interface ICard {
  page: number | undefined;
  prevPage: number | undefined;
  nextPage: number | undefined;
  results: Array<IResult>;
}
