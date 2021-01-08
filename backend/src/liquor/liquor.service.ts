import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Liquor, LiquorDocument } from './liquor.schema';
import { LiquorCategories } from './types/liquor.category';
import { LiquorInput, LiquorQueriesInput } from './types/liquor.input';
import { GetAllLiquorReturnData } from './types/liquor.types';

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
            id, img, category, price, info, _id: found._id
        } as Liquor
    }

    async getLiquorById(id: string): Promise<LiquorDocument> {
        return this.liquorModel.findOne({ id });
    }

    async getAllLiquor({ pageSize = "8", pageNum = "1", search = "", filter = "" }: LiquorQueriesInput): Promise<GetAllLiquorReturnData> {

        console.log('pageSize = ' + pageSize, 'pageNum = ' + pageNum);

        const skip = +pageSize * (+pageNum - 1);
        console.log(skip);

        // TODO: Cache totalCount
        const total = await (await this.liquorModel.count()).toString();


        const data = await this.liquorModel
            .find({
                'info.name': {
                    $regex: search, $options: "i"
                },
                'category.categoryId': {
                    $regex: filter
                }
            })
            .skip(skip)
            .limit(+pageSize);


        return { data, total }

    }
}


