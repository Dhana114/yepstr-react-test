export type ShuffleRes = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
};

export type Card = {
  image: string;
  value: string;
  code?: string;
  suit?: string;
};

export type DrawRes = {
  success: boolean;
  deck_id: string;
  remaining: number;
  cards: Card[];
};
