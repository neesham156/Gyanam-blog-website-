import Commet from "@/models/Commet";
import createHandler from "database";
import mongoose from "mongoose";

const handler = createHandler();
handler.post(async (req: any, res: any) => {
  console.log("hi", req.body);
  const comm = await new Commet(req.body);
  console.log(comm);
  comm
    .save()
    .then((result: any) => {
      res.status(201).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Something went wrong", record: err });
    });
});
handler.put(async(req:any,res:any)=>{


  console.log(req.body)
  Commet.updateOne({blog:req.body.blog},{$push:{comment:req.body.comment}})
  .then((result: any) => {
    res.status(200).json({ message: "data update ", record: result });
  })
  .catch((err: any) => {
    err.status(404).json({ message: "error", record: err });
  });
  });

export default handler;
