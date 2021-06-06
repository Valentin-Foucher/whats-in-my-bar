import Bar from '../models/bars';
import { ObjectID } from 'bson';
import { IBar } from 'whats-in-my-bar';

module Bars {
  export const create = async (userId: ObjectID, name?: string): Promise<IBar> => {
    return await Bar.create({ userId, name });
  };

  export const getByUserId = async (userId: ObjectID): Promise<IBar> => {
    return await Bar.findOne({ userId });
  };

  export const drop = async () => {
    await Bar.deleteMany({});
  };
};

export default Bars;