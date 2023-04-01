import Category from "@/models/Category";
import createHandler from "database";


const handler = createHandler();

handler.post(async (req: any, res: any) => {
  const category = await new Category(req.body);

  category
    .save()
    .then((result: any) => {
      res.status(201).json({ message: "category added", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Something went wrong", record: err });
    });
});

handler.put(async (req: any, res: any) => {
  console.log(req.body);
  Category.updateOne({ _id: req.body.id }, req.body)
    .then((result: any) => {
      res.status(200).json({ message: "data update ", record: result });
    })
    .catch((err: any) => {
      err.status(404).json({ message: "error", record: err });
    });
});

export default handler;