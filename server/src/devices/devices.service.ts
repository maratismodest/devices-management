import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { Device, DeviceSchema } from "./schemas/device.schema";

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private readonly deviceModel: Model<Device>) {
  }

  async create(createCatDto: CreateDeviceDto): Promise<Device> {
    const createdCat = await this.deviceModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async findOne(id: string): Promise<Device> {
    return this.deviceModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.deviceModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
