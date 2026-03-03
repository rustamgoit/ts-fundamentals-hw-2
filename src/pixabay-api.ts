import axios from "axios";
import type { PixabayResponse } from "./types/pixabay";
import { PER_PAGE } from "./pagination";

export const getImagesByQuery = async (
  query: string,
  page: number
): Promise<PixabayResponse> => {
  const response = await axios.get<PixabayResponse>(`https://pixabay.com/api/`, {
    params: {
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      key: "54880390-334f94e916bbc547ef8ac5011",
    },
  });
  return response.data;
};
