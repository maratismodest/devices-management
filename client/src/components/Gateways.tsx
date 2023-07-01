import React from "react";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";
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
        {gateways.map(({ _id, name, sn, devices }) => {
            return (
              <li key={_id} className="grid grid-cols-3 divide-x [&>div]:px-2">
                <div className="truncate">{sn}</div>
                <div className="truncate">{name}</div>
                <select>
                  {devices.map(_id => <option value={_id}>{data.find(x => x._id === _id)?.uid}</option>)}
                </select>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Gateways;
