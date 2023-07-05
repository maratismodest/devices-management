import React from "react";
import { devicesAPI } from "services/DevicesService";
import { gatewaysAPI } from "services/GatewaysService";
import Spinner from "ui/Spinner";
import { PageError } from "widgets/PageError/ui/PageError";

const Gateways = () => {
  const { data: gateways, isLoading } = gatewaysAPI.useFetchGatewaysQuery();
  const { data: apiDevices, isLoading: devicesLoading } = devicesAPI.useFetchDevicesQuery();

  if (isLoading || devicesLoading) {
    return <Spinner />;
  }

  if (!gateways || !apiDevices) {
    return <PageError />
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
                      const _device = apiDevices.find(x => x._id === _id);
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
