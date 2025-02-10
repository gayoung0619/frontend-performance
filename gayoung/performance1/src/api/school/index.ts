import { authAPI } from "../config.ts";
export const getSchoolList = () => {
  return authAPI.get(`/school?name=`);
};
