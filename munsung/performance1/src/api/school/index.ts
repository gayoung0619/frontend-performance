import { authAPI } from "../config.ts";

export interface Data {
  id: number;
  name: string;
}

export const getSchoolList = (): Promise<Data[]> => {
  return authAPI.get(`/school?name=`).then((res) => res.data);
};
