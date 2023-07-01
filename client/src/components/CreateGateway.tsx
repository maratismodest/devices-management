import React from "react";
import { useForm } from "react-hook-form";
import { CreateGatewayDto } from "types/global";
import { gatewaysAPI } from "services/GatewaysService";
import RequiredError from "./RequiredError";

type CreateGatewayForm = Omit<CreateGatewayDto, "devices">

const defaultValues: CreateGatewayForm = {
  sn: "",
  name: "",
  ip4: ""
};

const CreateGateway = () => {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues });

  const [createGateway] = gatewaysAPI.useCreateGatewayMutation();

  const onSubmit = (data: CreateGatewayForm) => {
    console.log(data);
    const body = { ...data, devices: [] };
    console.log("body", body);
    createGateway(body).unwrap().then(() => reset()).catch(e => console.log("e", e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Gateway</h2>

      <div className="grid">
        <label htmlFor="sn">Serial Number</label>
        <input id="sn" {...register("sn", { required: true })} placeholder="i.e. UWWD-333-2SD" />
        {errors.sn && <RequiredError />}
      </div>

      <div className="grid">
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name", { required: true })} placeholder="i.e. TP-Link 110" />
        {errors.name && <RequiredError />}
      </div>

      <div className="grid">
        <label htmlFor="ip4">IP-address</label>
        <input id="ip4" {...register("ip4", { required: true })} placeholder="i.e. 8.8.8.8" />
        {errors.ip4 && <RequiredError />}
      </div>

      <button type="submit" className="mt-auto">Create Gateway</button>
    </form>
  );
};

export default CreateGateway;
