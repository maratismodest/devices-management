import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateGatewayDto, Device, Gateway } from "types/global";

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
    }),
    createGateway: build.mutation<Gateway, CreateGatewayDto>({
      query: (gateway) => ({
        url: "/Gateways",
        method: "POST",
        body: gateway
      }),
      invalidatesTags: ["Gateways"]
    }),
    addDeviceToGateway: build.mutation<Gateway, { gatewayId: string, body: { deviceId: string } }>({
      query: ({ gatewayId, body }) => ({
        url: `/Gateways/${gatewayId}/add`,
        method: "PUT",
        body: body
      }),
      invalidatesTags: ["Gateways"]
    }),
    removeDeviceFromGateway: build.mutation<Gateway, { gatewayId: string, body: { deviceId: string } }>({
      query: ({ gatewayId, body }) => ({
        url: `/Gateways/${gatewayId}/remove`,
        method: "PUT",
        body: body
      }),
      invalidatesTags: ["Gateways"]
    }),
    deleteGateway: build.mutation<Device, string>({
      query: (id) => ({
        url: `/Gateways/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Gateways"]
    })
  })
});
