import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInfoInput } from 'src/order/types/order.input';
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


    async updateLiquor(options: LiquorInput, _id: string): Promise<Liquor | void> {
        console.log(_id, options.price);

        const { price, img = '', info, frequency } = options;

        const found = await this.getLiquorById(_id);
        if (!found) {
            return found;
        }
        let currentPrice;
        let history = [];
        if(found.price?.history) {
            history.push(...found.price.history);
        }
        if(price?.currentPrice) {
            currentPrice = price?.currentPrice;
            history.push({date: new Date(), price: price.currentPrice});
        } else currentPrice = found.price.currentPrice;
        const updatedData = {
            ...found._doc,
            price: {
                ...found.price,
                currentPrice,
                history,
            },
            img: img.length ? img : found.img,
            info: {
                ...found.info,
                ...info
            },
            frequency: frequency ? frequency : found.frequency 
        } as Liquor;
        await this.liquorModel.updateOne({ _id }, updatedData);

        return updatedData;
    }

    async getLiquorById(_id: string): Promise<LiquorDocument> {
        return this.liquorModel.findOne({ _id });
    }

    async getAllLiquor({ pageSize, pageNum, search = "", filter = "" }: LiquorQueriesInput): Promise<GetAllLiquorReturnData> {

        if (!pageSize.length) pageSize = '8';
        if (!pageNum.length) pageNum = '1';
        const skip = +pageSize * (+pageNum - 1);

        const aggregatedData = await this.liquorModel.aggregate(
            [
                {
                    $match: {
                        'info.name': {
                            $regex: search, $options: "i"
                        },
                        'category.categoryId': {
                            $regex: filter
                        }
                    }
                },
                {
                    $facet: {
                        count: [{ $count: "count" }],
                        sample: [{ $skip: skip }, { $limit: +pageSize }],
                        pageInfo: [{ $group: { _id: null, count: { $sum: 1 } } },]
                    }
                }
            ]
        )

        const total = aggregatedData[0]?.count.length ? aggregatedData[0]?.count[0]?.count : '0';
        const data = aggregatedData[0].sample;


        return { data, total }

    }


    async updateFrequencyForLiquors(productInfoInput: ProductInfoInput[]) {

        await this.asyncForEach(productInfoInput, async (x: ProductInfoInput) => {
            await this.liquorModel.update(
                {
                    _id: x.liquor
                },
                {
                    $inc: {
                        "frequency": +x.quantity
                    }
                });
        });
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

}


