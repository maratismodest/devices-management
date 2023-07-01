import React from "react";
import { useForm } from "react-hook-form";
import { CreateGatewayDto } from "types/global";
import { gatewaysAPI } from "services/GatewaysService";

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
    <form onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 flex-col items-center border p-8 mt-4">
      <h2>Create Gateway</h2>

      <div className="grid">
        <label htmlFor="sn">Uid</label>
        <input id="sn"  {...register("sn", { required: true })} />
        {errors.sn && <span className="text-red-500">This field is required</span>}
      </div>

      <div className="grid">
        <label htmlFor="name">Vendor</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <span className="text-red-500">This field is required</span>}
      </div>

      <div className="grid">
        <label htmlFor="ip4">ip4</label>
        <input id="ip4" {...register("ip4", { required: true })} />
        {errors.ip4 && <span className="text-red-500">This field is required</span>}
      </div>

      <button type="submit" className='mt-auto'>Create Gateway</button>
    </form>
  );
};

export default CreateGateway;
