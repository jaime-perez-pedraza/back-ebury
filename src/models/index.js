import mongoose from 'mongoose';

import Message from './message';

const connectDb = () => {
  return mongoose.connect(
    'mongodb+srv://admin:admin123@cluster0-6zx0g.gcp.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true,
    },
  );
};

const models = { Message };

export { connectDb };

export default models;
