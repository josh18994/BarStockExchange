import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Liquor, LiquorDocument } from './liquor.schema';
import {v4 as uuid} from 'uuid';
import { CreateLiquorInput } from './types/liquor.input';

@Injectable()
export class LiquorService {
    constructor(
        @InjectModel(Liquor.name)
        private liquorModel: Model<LiquorDocument>
    ) { }

    async createLiquor(options: CreateLiquorInput):Promise<Liquor> {
        const {img, category, price, info} = {...options};
        const id = uuid();
        const liquor = new this.liquorModel({id, img, category, price, info});
        return liquor.save();
    }

    async getAllLiquor(): Promise<Liquor[]> {
        return this.liquorModel.find();
    }
}
