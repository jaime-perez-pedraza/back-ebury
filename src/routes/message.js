import { Router } from 'express';
import { forEach } from 'lodash';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, +new Date() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.find();
  return res.send(messages);
});

var cpUpload = upload.fields([{ name: 'gallery', maxCount: 8 }]);

router.post('/', cpUpload, async (req, res) => {
  const images = [];
  if (req.files) {
    forEach(req.files.gallery, image => {
      images.push({ url: image.path });
    });
  }
  const message = await req.context.models.Message.create({
    emails: req.body.emails,
    cc: req.body.cc,
    bcc: req.body.bcc,
    subject: req.body.subject,
    message: req.body.message,
    images: images,
  });

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  );

  let result = null;
  if (message) {
    result = await message.remove();
  }

  return res.send(result);
});

export default router;
