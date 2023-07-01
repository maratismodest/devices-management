import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const devicesAPI = createApi({
  reducerPath: "devicesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Gateway", "Gateways", "Device", "Devices"],
  endpoints: (build) => ({
    fetchDevices: build.query<any[], void>({
      query: () => ({
        url: "/Devices"
      }),
      providesTags: result => ["Devices"]
    }),
    fetchDeviceById: build.query<any, number>({
      query: (id) => ({
        url: `/Devices/${id}`
      }),
      providesTags: result => ["Device"]
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
