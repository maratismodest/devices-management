import React from "react";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";
import { Device } from "../types/global";
import Spinner from "./Spinner";

const Gateways = () => {
  const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
  const { data = [] } = devicesAPI.useFetchDevicesQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="gateways" className="border">
      <h2 className="px-2">Gateways</h2>
      <ul className="mt-1 divide-y border-y">
        {gateways.map(({ _id, name, sn, devices, ip4 }) => {
            return (
              <li key={_id} className="grid grid-cols-4 divide-x [&>div]:px-2">
                <div className="truncate">{sn}</div>
                <div className="truncate">{name}</div>
                <div className="truncate">{ip4}</div>
                <div>
                  <select className="w-full">
                    <option value="" selected disabled>View Devices</option>
                    {devices.map((_id) => {
                      const _device = data.find(x => x._id === _id);
                      if (!_device) {
                        return null;
                      }
                      const info = [_device.vendor, _device.uid].join(" ");
                      return <option value={_id}>{info}</option>;
                    })}
                  </select>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Gateways;
