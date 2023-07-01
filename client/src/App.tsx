import React from "react";
import { useForm } from "react-hook-form";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "./services/DevicesService";
import { Device } from "./types/global";

type CreateDeviceForm = Omit<Device, "date">

const defaultValues: CreateDeviceForm = {
  uid: 0,
  vendor: "",
  status: false
};

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues });
  const onSubmit = (data: CreateDeviceForm) => {
    console.log(data);
    const body = { ...data, uid: Number(data.uid), date: +new Date() };
    console.log("body", body);
    createDevice(body).unwrap().then().catch(e => console.log("e", e));
  };

  const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
  const { data: devices = [] } = devicesAPI.useFetchDevicesQuery();
  const [createDevice] = devicesAPI.useCreateDeviceMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <h1>Gateways Management</h1>
      </header>
      <main>
        <div className="grid grid-cols-2 gap-4">
          {/*<div>*/}
          {/*  <h2>Gateways</h2>*/}
          {/*  <ul>{gateways.map(({ ip4, devices, name }) => <li key={name}>{name}</li>)}</ul>*/}
          {/*</div>*/}
          <div>
            <h2>Devices</h2>
            <ul>{devices.map(({ uid }) => <li key={uid}>{uid}</li>)}</ul>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 flex-col items-center border p-8">
          <h2>Create Device</h2>

          <div className="grid">
            <label htmlFor="uid">Uid</label>
            <input id="uid" type="number" {...register("uid", { required: true })} />
            {errors.uid && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="grid">
            <label htmlFor="vendor">Vendor</label>
            <input id="vendor" {...register("vendor", { required: true })} />
            {errors.vendor && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="flex justify-between gap-2">
            <label htmlFor="status">Status (online/offline)</label>
            <input id="status" type="checkbox" {...register("status")} />
          </div>
          <button type="submit">Create Device</button>
        </form>

      </main>
      <footer>
        <a href="https://t.me/maratfaizer">https://t.me/maratfaizer</a>
      </footer>
    </>

  );
}

export default App;
