import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateDeviceDto, Device } from "types/global";

export const devicesAPI = createApi({
  reducerPath: "devicesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Gateway", "Gateways", "Device", "Devices"],
  endpoints: (build) => ({
    fetchDevices: build.query<Device[], void>({
      query: () => ({
        url: "/Devices"
      }),
      providesTags: result => ["Devices"]
    }),
    fetchDeviceById: build.query<Device, number>({
      query: (id) => ({
        url: `/Devices/${id}`
      }),
      providesTags: result => ["Device"]
    }),
    createDevice: build.mutation<Device, CreateDeviceDto>({
      query: (device) => ({
        url: "/Devices",
        method: "POST",
        body: device
      }),
      invalidatesTags: ["Devices"]
    })
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
