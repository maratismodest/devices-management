import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Gateway } from "types/global";

export const gatewaysAPI = createApi({
  reducerPath: "gatewaysAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Gateway", "Gateways", "Device", "Devices"],
  endpoints: (build) => ({
    fetchGateways: build.query<Gateway[], void>({
      query: () => ({
        url: "/Gateways"
      }),
      providesTags: result => ["Gateways"]
    }),
    fetchGatewayById: build.query<Gateway, number>({
      query: (id) => ({
        url: `/Gateways/${id}`
      }),
      providesTags: result => ["Gateway"]
    })
    // createCompany: build.mutation<any, any>({
    //   query: (company) => ({
    //     url: "/Companies",
    //     method: "POST",
    //     body: company
    //   }),
    //   invalidatesTags: ["Gateways"]
    // }),
    // updateCompany: build.mutation<any, { id: number, body: any }>({
    //   query: ({ id, body }) => ({
    //     url: `/Companies/${id}`,
    //     method: "PUT",
    //     body
    //   }),
    //   invalidatesTags: ["Gateways"]
    // })
  })
});
