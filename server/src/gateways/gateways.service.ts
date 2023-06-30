import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGatewayDto } from "./dto/create-gateway.dto";
import { Gateway } from "./schemas/gateway.schema";

@Injectable()
export class GatewaysService {
  constructor(@InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>) {
  }

  async create(createCatDto: CreateGatewayDto): Promise<Gateway> {
    const createdCat = await this.gatewayModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Gateway[]> {
    return this.gatewayModel.find().exec();
  }

  async findOne(id: string): Promise<Gateway> {
    return this.gatewayModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.gatewayModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
