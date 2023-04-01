import axios from 'axios';
import moment from 'moment';
import React from 'react'

export default async function uploadFiles(file:any) {
  console.log(file)
    const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "GYANAM");
  formData.append("upload_preset", "iitcrqxf"); // Replace the preset name with your own
  formData.append("api_key", "151933611321642"); // Replace API key with your own Cloudinary key
  formData.append("timestamp", moment().toString());
  try {
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnpsritwd/image/upload",
      formData,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
  return (
    <div>

    </div>
  )
}
