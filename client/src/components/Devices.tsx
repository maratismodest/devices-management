import React from "react";
import { devicesAPI } from "services/DevicesService";
import getDateByTimestamp from "utils/getDateByTimestamp";
import Spinner from "./Spinner";

const Devices = () => {
    const { data: devices = [], isLoading } = devicesAPI.useFetchDevicesQuery();
    const [deleteDevice] = devicesAPI.useDeleteDeviceMutation();

    const handleDelete = async (id: string) => {
      try {
        await deleteDevice(id).unwrap();
        alert("Deleted");
      } catch (e) {
        console.log("e", e);
      }
    };

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div id="devices" className="border">
        <h2>Devices</h2>
        <ul className="mt-1 divide-y border-y">
          {devices.map(({ _id, uid, vendor, date, status }) => {
              return (
                <li key={_id} className="grid grid-cols-5 divide-x [&>div]:px-2">
                  <div className="truncate">{uid}</div>
                  <div className="truncate">{vendor}</div>
                  <div className="truncate">{getDateByTimestamp(date)}</div>
                  <div className="truncate">{status ? "on" : "off"}</div>
                  <div>
                    <button className="block mx-auto" onClick={() => handleDelete(_id)}>&#x2715;</button>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
;

export default Devices;
