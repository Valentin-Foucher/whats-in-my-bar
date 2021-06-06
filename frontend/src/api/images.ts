import { API_URL } from "./common";
import axios from "axios";

const IMAGES_API_URL = `${API_URL}/images`;

const uploadImage = async (file: File, referenceId: string) => {
  var bodyFormData = new FormData();
  bodyFormData.append("file", file);
  bodyFormData.append("referenceId", referenceId);

  return await axios.request({
    url: IMAGES_API_URL,
    method: "post",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const retrieveImage = async (filename: string) => {
  return await axios.get(`${IMAGES_API_URL}/${filename}`);
};

const updateImage = async (file: File, referenceId: string) => {
  var bodyFormData = new FormData();
  bodyFormData.append("file", file);
  bodyFormData.append("referenceId", referenceId);

  return await axios.request({
    url: IMAGES_API_URL,
    method: "put",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export { uploadImage, retrieveImage, updateImage };
