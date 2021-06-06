import { ObjectID } from 'bson';
import { IUser } from 'whats-in-my-bar';
import User from '../models/users';

module Users {
  export const create = async (username: string, password: string, email: string): Promise<IUser> => {
    return await User.create({ username, password, email });
  };

  export const findById = async (id: ObjectID): Promise<IUser> => {
    return await User.findById(id);
  };

  export const findByName = async (username: string): Promise<IUser> => {
    const user = await User.find({ username });
    return user.length === 1 ? user[0] : null;
  };

  export const remove = async (userId: ObjectID) => {
    return await User.findByIdAndDelete(userId);
  };

  export const drop = async () => {
    await User.deleteMany({});
  };
};

export default Users;