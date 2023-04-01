import Blog from "@/models/Blog";
import createHandler from "database";

const handler=createHandler();
handler.get(async (req: any, res: any) => {
 
    Blog.find().skip(req.query._start).limit(req.query._limit).then((result: any) => {
        res.status(200).json({ message: "data update ", record: result });
      })
      .catch((err: any) => {
        err.status(404).json({ message: "error", record: err });
      });
        
      
    });
export default handler; 