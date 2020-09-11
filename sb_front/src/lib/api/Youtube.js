import client from "./client.js";

export const Channels = (part, id) =>
  client.get(`/channels?part=${part}&id=${id}`);
