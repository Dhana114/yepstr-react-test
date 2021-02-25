import { API_URL } from "../config";
import { ShuffleRes, DrawRes } from "./api_types";

export const shuffleCards = (): Promise<ShuffleRes> =>
  fetch(`${API_URL}/new/shuffle`).then((res) => res.json());

export const drawCard = (deckID: string): Promise<DrawRes> =>
  fetch(`${API_URL}/${deckID}/draw/?count=1`).then((res) => res.json());

const API = {
  shuffleCards,
  drawCard,
};

export default API;
