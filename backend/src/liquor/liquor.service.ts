import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Liquor, LiquorDocument } from './liquor.schema';
import { v4 as uuid } from 'uuid';
import { LiquorInput } from './types/liquor.input';
import { LiquorCategories } from './types/liquor.category';

@Injectable()
export class LiquorService {
    constructor(
        @InjectModel(Liquor.name)
        private liquorModel: Model<LiquorDocument>
    ) { }

    async createLiquor(options: LiquorInput): Promise<Liquor> {
        const { img, category, price, info } = options;
        if (category.categoryId) {
            category.categoryType = LiquorCategories[category.categoryId];
        }
        const id = uuid();
        const liquor = new this.liquorModel({ id, img, category, price, info });
        return liquor.save();
    }


    async updateLiquor(options: LiquorInput, id: string): Promise<Liquor | void> {
        const { img, category, price, info } = options;
        if (category.categoryId) {
            category.categoryType = LiquorCategories[category.categoryId];
        }

        let updatedData;

        const found = await this.getLiquorById(id);
        if (!found) {
            return found;
        }
        updatedData = await this.liquorModel.updateOne({ id }, { img, category, price, info });
        if (updatedData.nModified <= 0) {
            return null;
        }
        return {
            id, img, category, price, info
        } as Liquor
    }

    async getLiquorById(id: string): Promise<LiquorDocument> {
        return this.liquorModel.findOne({ id });
    }

    async getAllLiquor(): Promise<Liquor[]> {
        return this.liquorModel.find();
    }
}

