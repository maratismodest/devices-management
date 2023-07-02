import React, { Suspense } from "react";
import Footer from "layout/Footer";
import Header from "layout/Header";
import AddDeviceToGateway from "components/AddDeviceToGateway";
import CreateDevice from "components/CreateDevice";
import CreateGateway from "components/CreateGateway";
import Devices from "components/Devices";
import Gateways from "components/Gateways";
import RemoveDeviceFromGateway from "components/RemoveDeviceFromGateway";
import Spinner from "ui/Spinner";

function App() {

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <div className="grid grid-cols-2 gap-4">
            <Gateways />
            <Devices />
            <CreateGateway />
            <CreateDevice />
            <AddDeviceToGateway />
            <RemoveDeviceFromGateway />
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
