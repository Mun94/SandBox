const CREATOR_UPLOAD = "/users";
const CREATOR_REGISTER = "/users";
const CREATOR_DELETE = "/users/:id";
const VIDEO_COUNT_PATCH = "/users/:id";

const API = "/api";

const routes = {
  creatorUpload: CREATOR_UPLOAD,
  creatorRegister: CREATOR_REGISTER,
  creatorDelete:CREATOR_DELETE,
  videoCountPatch: VIDEO_COUNT_PATCH,
  api: API,
};

export default routes;
