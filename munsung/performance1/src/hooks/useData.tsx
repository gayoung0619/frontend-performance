import { useQuery } from "@tanstack/react-query";
import { getSchoolList } from "../api/school";

export const useData = () => (
  useQuery({
    queryKey: ["data"],
    queryFn: getSchoolList,
  })
);