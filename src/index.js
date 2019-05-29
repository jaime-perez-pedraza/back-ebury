import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes

app.use('/messages', routes.message);
app.get('/', (req, res) => {
  res.send('hello im here');
});

// Start

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.Message.deleteMany({})]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT || 5000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  const message1 = new models.Message({
    emails: ['jaime@gmail.com'],
    cc: [],
    bcc: [],
    subject: 'First test',
    message: 'Message in test',
    images: [],
  });

  await message1.save();
};
