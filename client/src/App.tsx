import React from "react";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";
import AddDeviceToGateway from "components/AddDeviceToGateway";
import CreateDevice from "components/CreateDevice";
import CreateGateway from "components/CreateGateway";
import RemoveDeviceFromGateway from "./components/RemoveDeviceFromGateway";

function App() {

  const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
  const { data: devices = [] } = devicesAPI.useFetchDevicesQuery();
  const [deleteDevice] = devicesAPI.useDeleteDeviceMutation();

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
          <div id="gateways" className="border">
            <h2>Gateways</h2>
            <ul className="mt-4 grid grid-cols-1 divide-y border-y">{gateways.map(({ _id, name, sn, devices }) =>
              <li key={_id} className="grid grid-cols-3 divide-x">
                <div>{sn}</div>
                <div>{name}</div>
                <div>{devices.join(", ")}</div>
              </li>
            )}</ul>
          </div>

          <div id="devices" className="border">
            <h2>Devices</h2>
            <ul className="mt-4 grid grid-cols-1 divide-y border-y">{devices.map(({ _id, uid, vendor, date, status }) =>
              <li key={_id} className="grid grid-cols-5 divide-x">
                <div className="truncate">{uid}</div>
                <div className="truncate">{vendor}</div>
                <div className="truncate">{date}</div>
                <div className="truncate">{status ? "on" : "off"}</div>
                <div className="truncate">
                  <button className="block mx-auto" onClick={() => {
                    deleteDevice(_id).unwrap().then(() => alert("Deleted")).catch((e) => console.log("e", e));
                  }}>&#x2715;</button>
                </div>
              </li>
            )}</ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CreateDevice />
          <CreateGateway />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AddDeviceToGateway />
          <RemoveDeviceFromGateway />
        </div>


      </main>
      <footer>
        <a href="https://t.me/maratfaizer">https://t.me/maratfaizer</a>
      </footer>
    </>

  );
}

export default App;
