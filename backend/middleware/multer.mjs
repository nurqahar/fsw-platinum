import Multer from "multer";

const Storage = new Multer.memoryStorage();
const upload = Multer({ storage: Storage });

export default upload;
