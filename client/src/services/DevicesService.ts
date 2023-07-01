import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateDeviceDto, Device } from "types/global";

export const devicesAPI = createApi({
  reducerPath: "devicesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NODE }),
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
    }),
    deleteDevice: build.mutation<Device, string>({
      query: (id) => ({
        url: `/Devices/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Devices", "Gateways"]
    })
  })
});
