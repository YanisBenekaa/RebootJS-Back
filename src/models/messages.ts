import { Document, Model, model, Schema } from "mongoose";

export interface IMessage extends Document {
  conversationId: string;
  emitter: string;
  targets: string[];
  createdAt: Date;
  content: string;
}

const messageSchema = new Schema({
  conversationId: { type: String, required: true },
  emitter: { type: Schema.Types.ObjectId, ref: "profile", required: true },
  targets: {
    type: [{ type: Schema.Types.ObjectId, ref: "profile" }],
    required: true,
  },
  createdAt: { type: Schema.Types.Date, default: new Date(), required: true },
  content: { type: String, required: true },
});

export const Message = model<IMessage, Model<IMessage>>(
  "message",
  messageSchema
);
