import React from "react";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "./services/DevicesService";

function App() {
  const { data: gateways = [], isLoading } = gatewaysAPI.useFetchGatewaysQuery();
  const { data: devices = [] } = devicesAPI.useFetchDevicesQuery();

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
          <div>
            <h2>Gateways</h2>
            <ul>{gateways.map(gateway => <li key={gateway}>{gateway}</li>)}</ul>
          </div>
          <div>
            <h2>Devices</h2>
            <ul>{devices.map(devices => <li key={devices}>{devices}</li>)}</ul>
          </div>
        </div>

      </main>
      <footer>
        <a href="https://t.me/maratfaizer">https://t.me/maratfaizer</a>
      </footer>
    </>

  );
}

export default App;
