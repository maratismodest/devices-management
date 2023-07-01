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
        <input id="sn"  {...register("sn", { required: true })} />
        {errors.sn && <RequiredError />}
      </div>

      <div className="grid">
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <RequiredError />}
      </div>

      <div className="grid">
        <label htmlFor="ip4">IP-address</label>
        <input id="ip4" {...register("ip4", { required: true })} />
        {errors.ip4 && <RequiredError />}
      </div>

      <button type="submit" className="mt-auto">Create Gateway</button>
    </form>
  );
};

export default CreateGateway;
