import React from "react";
import { useForm } from "react-hook-form";
import { devicesAPI } from "services/DevicesService";
import { CreateDeviceDto } from "types/global";
import RequiredError from "./RequiredError";

type CreateDeviceForm = Omit<CreateDeviceDto, "date">

const defaultValues: CreateDeviceForm = {
  uid: 0,
  vendor: "",
  status: false
};

const CreateDevice = () => {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues });

  const [createDevice] = devicesAPI.useCreateDeviceMutation();
  const onSubmit = (data: CreateDeviceForm) => {
    console.log(data);
    const body = { ...data, uid: Number(data.uid), date: +new Date() };
    console.log("body", body);
    createDevice(body).unwrap().then(() => reset()).catch(e => console.log("e", e));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Device</h2>

      <div className="grid">
        <label htmlFor="uid">Uid</label>
        <input id="uid" type="number" {...register("uid", { required: true })} />
        {errors.uid && <RequiredError />}
      </div>

      <div className="grid">
        <label htmlFor="vendor">Vendor</label>
        <input id="vendor" {...register("vendor", { required: true })} />
        {errors.vendor && <RequiredError />}
      </div>

      <div className="flex justify-between gap-2">
        <label htmlFor="status">Status (online/offline)</label>
        <input id="status" type="checkbox" {...register("status")} />
      </div>
      <button type="submit" className="mt-auto">Create Device</button>
    </form>
  );
};

export default CreateDevice;
