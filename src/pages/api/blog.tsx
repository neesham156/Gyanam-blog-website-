
import Blog from "@/models/Blog";
import createHandler from "../../../database";

const handler = createHandler();
handler.post(async (req: any, res: any) => {
  console.log(req.body);
  const user = await new Blog(req.body);
console.log(user);
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
  console.log(req.query.id);
  Blog.deleteOne({ _id: req.query.id })
    .then((result: any) => {
      res.status(202).json({ message: "User created", record: result });
    })
    .catch((err: any) => {
      res.status(404).json({ message: "Something went wrong", record: err });
    });
});
handler.get(async (req: any, res: any) => {
 
const page=req.query.cate || 0;
const blogsPerPage=5;
Blog.find().skip(page*blogsPerPage).limit(5).then((result: any) => {
  res.status(200).json({ message: "data update ", record: result });
})
.catch((err: any) => {
  err.status(404).json({ message: "error", record: err });
});
  
});
handler.put(async (req: any, res: any) => {

  Blog.updateOne({ _id: req.body.id }, req.body)
    .then((result: any) => {
      res.status(200).json({ message: "data update ", record: result });
    })
    .catch((err: any) => {
      err.status(404).json({ message: "error", record: err });
    });
});
export default handler;
