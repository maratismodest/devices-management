import React from "react";
import { useForm } from "react-hook-form";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";
import RequiredError from "./RequiredError";

export interface RemoveDeviceFromGatewayForm {
  gatewayId: string,
  deviceId: string
}

const defaultValues: RemoveDeviceFromGatewayForm = {
  gatewayId: "",
  deviceId: ""
};

const RemoveDeviceFromGateway = () => {
    const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
    const { data: devices = [] } = devicesAPI.useFetchDevicesQuery();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues });

    const gatewayId = watch("gatewayId");

    const [removeDeviceFromGateway] = gatewaysAPI.useRemoveDeviceFromGatewayMutation();

    const onSubmit = (data: RemoveDeviceFromGatewayForm) => {
      removeDeviceFromGateway({
        gatewayId: data.gatewayId,
        body: { deviceId: data.deviceId }
      }).unwrap().then(() => reset()).catch(e => console.log("e", e));
    };

    const gateway = gateways.find(x => x._id === gatewayId);
    const gatewayDevices = devices.filter(x => gateway?.devices.includes(x._id));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Remove Device From Gateway</h2>

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
            {gatewayDevices.map(x => <option key={x._id} value={x._id}>{x.uid}</option>)}
          </select>
          {errors.deviceId && <RequiredError />}
        </div>

        <button type="submit" className="mt-auto">Remove Device</button>
      </form>
    );
  }
;

export default RemoveDeviceFromGateway;
