import { ObjectID } from 'bson';
import { IToken } from 'whats-in-my-bar';
import Token from '../models/tokens';

module Tokens {
  export const create = async (userId: ObjectID, value: string): Promise<IToken> => {
    return await Token.create({ userId, value });
  };

  export const getByValue = async (value: string): Promise<IToken> => {
    return await Token.findOne({ value });
  };

  export const drop = async () => {
    await Token.deleteMany({});
  };
};

export default Tokens;