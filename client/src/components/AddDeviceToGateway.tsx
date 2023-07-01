import React from "react";
import { useForm } from "react-hook-form";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";

export interface AddDeviceToGatewayForm {
  gatewayId: string,
  deviceId: string
}

const defaultValues: AddDeviceToGatewayForm = {
  gatewayId: "",
  deviceId: ""
};

const AddDeviceToGateway = () => {
    const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
    const { data: devices = [] } = devicesAPI.useFetchDevicesQuery();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues });

    const [addDeviceToGateway] = gatewaysAPI.useAddDeviceToGatewayMutation();

    const onSubmit = (data: AddDeviceToGatewayForm) => {
      console.log(data);
      const body = { ...data, devices: [] };
      console.log("body", body);
      addDeviceToGateway({
        gatewayId: data.gatewayId,
        body: { deviceId: data.deviceId }
      }).unwrap().then(() => reset()).catch(e => console.log("e", e));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 flex-col items-center border p-8 mt-4">
        <h2>Add Device To Gateway</h2>

        <div className="grid">
          <label htmlFor="gateway">Gateway</label>
          <select id="gateway" {...register("gatewayId", { required: true })} >
            <option value="" selected disabled>-- Select Gateway --</option>
            {gateways.map(x => <option key={x._id} value={x._id}>{x.name}</option>)}
          </select>
          {errors.gatewayId && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="grid">
          <label htmlFor="device">Device</label>
          <select id="device" {...register("deviceId", { required: true })} >
            <option value="" selected disabled>-- Select Device --</option>
            {devices.map(x => <option key={x._id} value={x._id}>{x.uid}</option>)}
          </select>
          {errors.deviceId && <span className="text-red-500">This field is required</span>}
        </div>

        <button type="submit" className="mt-auto">Add Device</button>
      </form>
    );
  }
;

export default AddDeviceToGateway;
