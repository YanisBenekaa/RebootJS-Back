import { Message } from "../models/messages";
import { IProfile } from "../models/profiles";

async function getAllMessages(user: IProfile, conversationId?: string) {
  try {
    const userId = user._id;
    const query: { $or: any; $and?: any } = {
      $or: [{ emitter: userId }, { targets: userId }],
      $and: [{ conversationId: conversationId }],
    };
    if (!conversationId) delete query.$and;
    const messages = await Message.find(query, null, {
      sort: { createdAt: 1 },
    });
    return messages;
  } catch (error) {
    throw new Error("Error while searching for messages in DB");
  }
}

async function createMessage(
  user: IProfile,
  conversationId: string,
  targets: string[],
  emitter: string,
  content: string
) {
  // TO DO
}

export { getAllMessages, createMessage };
