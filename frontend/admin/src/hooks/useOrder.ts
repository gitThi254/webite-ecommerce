import { useQuery } from "@tanstack/react-query";
import { getOrdersReq } from "../api/order.api";

export const useOders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersReq,
  });
