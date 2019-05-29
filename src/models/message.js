import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  emails: {
    type: Array,
    required: true,
  },
  cc: {
    type: Array,
    required: false,
  },
  bcc: {
    type: Array,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
});


const Message = mongoose.model('Message', messageSchema);

export default Message;
