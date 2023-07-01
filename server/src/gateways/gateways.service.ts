import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import throwCustomError from "../utils/throwError";
import { CreateGatewayDto } from "./dto/create-gateway.dto";
import { Gateway } from "./schemas/gateway.schema";

@Injectable()
export class GatewaysService {
  constructor(@InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>) {
  }

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const createdGateway = await this.gatewayModel.create(createGatewayDto);
    return createdGateway;
  }

  async findAll(): Promise<Gateway[]> {
    return this.gatewayModel.find().exec();
  }

  async findOne(id: string): Promise<Gateway> {
    return this.gatewayModel.findOne({ _id: id }).exec();
  }

  async addDevice(id: string, deviceId: string) {
    /** Check if Device is already related to some Gateway */
    const gatewayWithDeviceId = await this.gatewayModel.findOne({ devices: { "$in": [deviceId] } }).exec();
    if (gatewayWithDeviceId) {
      throw new HttpException("Device is already related to some Gateway", HttpStatus.FORBIDDEN);
    }

    /** Find Gateway */
    const gateway = await this.gatewayModel.findOne({ _id: id }).exec();
    if (gateway) {
      /** Check if Gateway reached connected Devices limit */
      if (gateway.devices.length === 10) {
        throw new HttpException("Gateway reached connected Devices limit", HttpStatus.FORBIDDEN);
      }

      gateway.devices = [...gateway.devices, deviceId];
      await gateway.save();
      return gateway;
    }
  }

  async delete(id: string) {
    const deletedGateway = await this.gatewayModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedGateway;
  }
}
