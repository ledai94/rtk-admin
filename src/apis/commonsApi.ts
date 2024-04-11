import { createApi } from "@reduxjs/toolkit/query/react";
import myFetchQuery from "./myFetchQuery";
import { ResponseData } from "./types";

export interface DictData extends ResponseData {
  list?: {
    value: any;
    text: string;
  }[];
}

export const commonsApi = createApi({
  baseQuery: myFetchQuery,
  tagTypes: [],
  reducerPath: "commonsApi",
  endpoints: (builder) => ({
    //Get the data from the data dictionary and directly pass it into the data dictionary url
    getDictData: builder.query<DictData, string>({
      query: (url: string) => url,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetDictDataQuery } = commonsApi;
