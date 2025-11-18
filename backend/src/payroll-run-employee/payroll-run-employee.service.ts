import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayrollRunEmployee } from '../models/PayrollRunEmployee';
import { CreatePayrollRunEmployeeDto } from './dto/create-payroll-run-employee.dto';
import { UpdatePayrollRunEmployeeDto } from './dto/update-payroll-run-employee.dto';

@Injectable()
export class PayrollRunEmployeeService {
  constructor(
    @InjectModel(PayrollRunEmployee.name)
    private payrollRunEmployeeModel: Model<PayrollRunEmployee>,
  ) {}

  async create(createDto: CreatePayrollRunEmployeeDto): Promise<PayrollRunEmployee> {
    const created = new this.payrollRunEmployeeModel({
      ...createDto,
      payrollRunId: new Types.ObjectId(createDto.payrollRunId),
      employeeId: new Types.ObjectId(createDto.employeeId),
    });
    return created.save();
  }

  async findAll(): Promise<PayrollRunEmployee[]> {
    return this.payrollRunEmployeeModel.find().exec();
  }

  async findOne(id: string): Promise<PayrollRunEmployee> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const result = await this.payrollRunEmployeeModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`PayrollRunEmployee with ID ${id} not found`);
    }
    return result;
  }

  async findByPayrollRunId(payrollRunId: string): Promise<PayrollRunEmployee[]> {
    if (!Types.ObjectId.isValid(payrollRunId)) {
      throw new NotFoundException(`Invalid PayrollRun ID format: ${payrollRunId}`);
    }
    return this.payrollRunEmployeeModel
      .find({ payrollRunId: new Types.ObjectId(payrollRunId) })
      .exec();
  }

  async findByEmployeeId(employeeId: string): Promise<PayrollRunEmployee[]> {
    if (!Types.ObjectId.isValid(employeeId)) {
      throw new NotFoundException(`Invalid Employee ID format: ${employeeId}`);
    }
    return this.payrollRunEmployeeModel
      .find({ employeeId: new Types.ObjectId(employeeId) })
      .exec();
  }

  async update(id: string, updateDto: UpdatePayrollRunEmployeeDto): Promise<PayrollRunEmployee> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const updateData: any = { ...updateDto };
    if (updateDto.payrollRunId) {
      updateData.payrollRunId = new Types.ObjectId(updateDto.payrollRunId);
    }
    if (updateDto.employeeId) {
      updateData.employeeId = new Types.ObjectId(updateDto.employeeId);
    }

    const updated = await this.payrollRunEmployeeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`PayrollRunEmployee with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const result = await this.payrollRunEmployeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`PayrollRunEmployee with ID ${id} not found`);
    }
  }

  async removeAll(): Promise<{ deletedCount: number }> {
    const result = await this.payrollRunEmployeeModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount || 0 };
  }
}

