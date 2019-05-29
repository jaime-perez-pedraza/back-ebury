import mongoose from 'mongoose';

import Message from './message';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });
};

const models = { Message };

export { connectDb };

export default models;
