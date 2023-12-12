import axios from "./axios";

export const getColorsReq = (): Promise<Color[]> =>
  axios.get("/color").then((res) => res.data.data);

export const createColorReq = (data: Color): Promise<Color> =>
  axios.post("/color", data).then((res) => res.data.data);

export const deleteColorReq = (id?: string): Promise<Color> =>
  axios.delete(`/color/${id}`).then((res) => res.data.data);

export const getColorReq = (id?: string): Promise<Color> =>
  axios.get(`/color/${id}`).then((res) => res.data.data);

export const updateColorReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Color;
}): Promise<Color> =>
  axios.put(`/color/${id}`, data).then((res) => res.data.data);
