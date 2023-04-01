import Author from "@/models/Author";
import createHandler from "../../../database";

const handler = createHandler();
handler.post(async (req: any, res: any) => {
  
  const user = await new Author(req.body);
 
  user
    .save()
    .then((result: any) => {
      res.status(201).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Something went wrong", record: err });
    });
});
handler.delete(async (req: any, res: any) => {

  Author.deleteOne({ _id: req.query.id })
    .then((result: any) => {
      res.status(202).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(404).json({ message: "Something went wrong", record: err });
    });
});
handler.get(async (req: any, res: any) => {
  Author.find({})
    .then((result: any) => {
      res.status(202).json({ message: "Data founded", record: result });
    })
    .catch((err: any) => {
      res.status(404).json({ message: "data  not found", record: err });
    });
});
handler.put(async (req: any, res: any) => {
 
  Author.updateOne({ email: req.body.email }, req.body)
    .then((result: any) => {
      res.status(200).json({ message: "data update ", record: result });
    })
    .catch((err: any) => {
      err.status(404).json({ message: "error", record: err });
    });
});
export default handler;
