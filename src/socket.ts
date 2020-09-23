import { Server as HTTPServer } from "http";
import socketIO, { Server as SocketServer, Socket } from "socket.io";
import passportSocketIo from "passport.socketio";
import { IConfig } from "./config";
import { Store } from "express-session";
import passport from "passport";
import { Profile } from "./models/profiles";

const actives = new Set<Socket>();
export let io: SocketServer;

export function initializeSockets(
  config: IConfig,
  httpServer: HTTPServer,
  sessionStore: Store
): SocketServer {
  const { session_cookie_name, session_secret } = config;
  io = socketIO(httpServer);
  io.use(
    passportSocketIo.authorize({
      key: session_cookie_name,
      secret: session_secret,
      store: sessionStore,
      passport: passport,
      // cookieParser: cookieParser as any,
    })
  );
  io.on("connection", (socket) => connect(socket));
  return io;
}

async function connect(socket: Socket): Promise<void> {
  const _id: string = (socket.request.user as any)._id;
  actives.add(socket);
  const user = await Profile.findById(_id);
  if (!user) {
    closeSocket(socket);
    return exitUserNotFound(_id);
  }
  user.socket = socket.id;
  await user.save();
  socket.on("disconnect", () => disconnect(socket, _id));
  io.emit("user-update", user.getSafeProfile());
}

async function disconnect(socket: Socket, _id: string): Promise<void> {
  closeSocket(socket);
  const user = await Profile.findById(_id);
  if (!user) return exitUserNotFound(_id);
  delete user.socket;
  await user.save();
  io.emit("user-update", user.getSafeProfile());
}

function closeSocket(socket: Socket): void {
  socket.disconnect();
  actives.delete(socket);
}

function exitUserNotFound(_id: string): void {
  console.log(`User not found: ${_id}`);
}
