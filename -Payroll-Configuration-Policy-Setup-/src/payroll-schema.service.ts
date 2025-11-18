import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PayrollSchema } from './models/PayrollSchema.schema';

@Injectable()
export class PayrollSchemaService {
  constructor(
    @InjectModel(PayrollSchema.name)
    private payrollSchemaModel: Model<PayrollSchema>,
  ) {}

  async create(createPayrollSchemaDto: Partial<PayrollSchema>): Promise<PayrollSchema> {
    const created = new this.payrollSchemaModel(createPayrollSchemaDto);
    return created.save();
  }

  async findAll(): Promise<PayrollSchema[]> {
    return this.payrollSchemaModel.find().exec();
  }

  async findOne(id: string): Promise<PayrollSchema | null> {
    return this.payrollSchemaModel.findById(id).exec();
  }

  async update(id: string, updatePayrollSchemaDto: Partial<PayrollSchema>): Promise<PayrollSchema | null> {
    return this.payrollSchemaModel
      .findByIdAndUpdate(id, updatePayrollSchemaDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<PayrollSchema | null> {
    return this.payrollSchemaModel.findByIdAndDelete(id).exec();
  }
}

