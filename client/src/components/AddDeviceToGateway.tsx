import React from "react";
import { useForm } from "react-hook-form";
import { devicesAPI } from "services/DevicesService";
import { gatewaysAPI } from "services/GatewaysService";
import { Device } from "types/global";
import RequiredError from "./RequiredError";

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
      addDeviceToGateway({
        gatewayId: data.gatewayId,
        body: { deviceId: data.deviceId }
      }).unwrap().then(() => reset()).catch(e => console.log("e", e));
    };
    const connectableDevices = devices.reduce((prev: Device[], current) => {
      if (gateways.find(x => x.devices.includes(current._id))) {
        return prev;
      }
      return [...prev, current];
    }, []);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add Device To Gateway</h2>
        <div className="grid">
          <label htmlFor="gateway">Gateway</label>
          <select id="gateway" {...register("gatewayId", { required: true })} >
            <option value="" selected disabled>-- Select Gateway --</option>
            {gateways.map(x => <option key={x._id} value={x._id}>{x.name}</option>)}
          </select>
          {errors.gatewayId && <RequiredError />}
        </div>

        <div className="grid">
          <label htmlFor="device">Device</label>
          <select id="device" {...register("deviceId", { required: true })} >
            <option value="" selected disabled>-- Select Device --</option>
            {connectableDevices.map(x => <option key={x._id} value={x._id}>{x.uid}</option>)}
          </select>
          {errors.deviceId && <RequiredError />}
        </div>

        <button type="submit" className="mt-auto">Add Device</button>
      </form>
    );
  }
;

export default AddDeviceToGateway;
