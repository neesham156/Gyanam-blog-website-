import Author from "@/models/Author";
import Category from "@/models/Category";
import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import dbConnect, { Jsonify } from "database/database";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import uploadFiles from "@/controler/upload_file";

export async function getServerSideProps(context: any) {
  dbConnect;
  const a = await Category.find({});
  let session = await getSession(context);

  const user = await Author.findOne({ email: session?.user?.email });

  return {
    props: {
      item: Jsonify(a),
      user: Jsonify(user),
    },
  };
}


export default function Index({ item, user }: any) {
  const editor = useRef(null);
const[set,setSet]=useState(false)
  const [blogData, setBlogData] = useState<any>({
    title: "",
    image: "",
    author: user.name,
    slug: "",
    category: "",
    description: "",
    is_active: true,
  });

  const [error, setError] = useState<any>();
  
  // const [img,setImg]=useState<any>([])
  const handle_Submit = async (values: any) => {
    console.log(values.image[0])
     await uploadFiles(values.image[0]).then((response) => {
      setBlogData({
        title: blogData.title,
        slug: blogData.slug,
        image: response.secure_url,
        author: blogData.author,
        is_active: blogData.is_active,
        category: blogData.category,
        description: blogData.description,
      })

      // saeBroadcast(values)
      //   .then((response: any) => {
      //     sendBroadcastNotification(values).then(() => {
      //       setLoading(false);
      //       router.reload();
      //     });
      //   })
      //   .catch((err: any) => console.log(err));
    });
      };
      console.log("hey",blogData)

  const handleSubmit = async (values: any) => {
    axios
      .post(`/api/blog`, values)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => setError(err.response.data.record.code));
  };
console.log(error)
 
  return (
    <>
      <div className="flex justify-center p-10">
      
        <div className="w-full md:w-1/2 flex justify-start flex-col gap-10 p-10 bg-gray-900 rounded-lg ">
          <Input
            variant="standard"
            label="Title"
            required
            className="text-gray-50 text-xl"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({
                title: e.target.value,
                image: blogData.image,
                slug: e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
                  .replace(/\s+/g, "-") // collapse whitespace and replace by -
                  .replace(/-+/g, "-") // collapse dashes
                  .replace(/^-+/, "") // trim - from start of text
                  .replace(/-+$/, ""),
                author: blogData.author,
                is_active: blogData.is_active,
                category: blogData.category,
                description: blogData.description,
              })
            }
          />
          <div className="flex gap-2">
       
          <Input
            variant="standard"
            type="file"
            accept="image/*"
            label="Image"
            className="text-gray-50  text-opacity-30"
          
            onChange={(e) =>
              setBlogData({
                title: blogData.title,
                slug: blogData.slug,
                image: e.target.files,
                author: blogData.author,
                is_active: blogData.is_active,
                category: blogData.category,
                description: blogData.description,
              })
            }
          />
           <Button color="red" className="bg-opacity-90" ripple={true} onClick={() => handle_Submit(blogData)}>
            {" "}
            Upload{" "}
          </Button>
          </div>

          <Select
            size="lg"
            label={blogData.category}
            value={blogData.category}
            className="text-m text-gray-50"
            onChange={(e: any) => {
              console.log(e);
              setBlogData({
                title: blogData.title,

                slug: blogData.slug,
                image: blogData.image,
                category: e,
                author: blogData.author,
                is_active: blogData.is_active,
                description: blogData.description,
              });
            }}
          >
            {item.map((e: any) => (
              <>
                <Option value={e.slug}>{e.category_name}</Option>
              </>
            ))}
            <Option value={"other"} onClick={()=>setSet(true)}>Other </Option>


          </Select>
         {
          set?(<>
            <Input
            variant="standard"
            label="Enter Category"
            required
            className="text-gray-50 text-xl"
           
            onChange={(e) =>
              setBlogData({
                title: blogData.title,
                
                slug: blogData.slug,
                image: blogData.image,
                author: blogData.author,
                is_active: blogData.is_active,
                category: e.target.value,
                description: blogData.description,
              })
            }
          />
          
          </>):(
          <>
          </>)
         }

          <Textarea
            size="lg"
            required
            label="Description"
            value={blogData.description}
            className="text-gray-50 h-96"
            onChange={(e: any) => {
              console.log(e);
              setBlogData({
                title: blogData.title,
                slug: blogData.slug,
                image: blogData.image,
                author: blogData.author,
                is_active: blogData.is_active,
                category: blogData.category,
                description: e.target.value,
              });
            }}
          />

          {/* <JoditEditor 
              ref={editor}
              value={blogData.description}
            onChange={(e: any) => {
              console.log(e);
              setBlogData({
                title: blogData.title,
                slug: blogData.slug,
                author:blogData.author,
                is_active:blogData.is_active,
                category:blogData.category ,
                description: e.target.value,
              });
            }}
          /> */}
 { error==11000?(
       
       <p className="text-sm text-red-400" >Title already exist</p>
      
       ):
       (
       <>
       </>)
       
      }
          <Button ripple={true} onClick={() => handleSubmit(blogData)}>
            {" "}
            Publish{" "}
          </Button>
        </div>
      </div>
    </>
  );
}
