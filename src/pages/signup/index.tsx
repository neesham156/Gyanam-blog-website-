import Author from "@/models/Author";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,Option,
} from "@material-tailwind/react";
import axios from "axios";
import dbConnect, { Jsonify } from "database/database";

import { Router, useRouter } from "next/router";
import { useState } from "react";
const bcrypt = require("bcryptjs");

export async function getServerSideProps() {
  dbConnect();
  const user = await Author.find({});

  return {
    props: {
      userr: Jsonify(user),
    },
  };
}
export default function Example({ userr }: any) {
  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    education: "",
    gender:"",
    address: "",
    phone_no: "",
    password: "",
    slug: "",
    is_active:true,
  });
  console.log(user);
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    console.log("heyy", values.password);
    values.password = await bcrypt.hash(values.password, 10);
    axios
      .post(`/api/author`, values)
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>

      <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="NAME"
              size="lg"
              required
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({
                  name: e.target.value,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
                    .replace(/\s+/g, "-") // collapse whitespace and replace by -
                    .replace(/-+/g, "-") // collapse dashes
                    .replace(/^-+/, "") // trim - from start of text
                    .replace(/-+$/, ""),
                  email: user.email,
                  gender:user.gender,
                  education: user.education,
                  address: user.address,
                  phone_no: user.phone_no,
                  password: user.password,
                  is_active:user.is_active,
                })
              }
            />
            <Input
              label="EMAIL"
              size="lg"
              required
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  name: user.name,
                  slug: user.slug,
                  gender:user.gender,
                  email: e.target.value,
                  education: user.education,
                  address: user.address,
                  phone_no: user.phone_no,
                  is_active:user.is_active,
                  password: user.password,
                })
              }
            />
              <Select variant="outlined" size="lg" label="Select Gender"  value={user.gender} onChange={(e)=>
               setUser({
                name: user.name,
                slug: user.slug,
                email: user.email,
                gender:e,

                education: user.education,
                address: user.address,
                phone_no: user.phone_no,
                is_active:user.is_active,
                password: user.password,
              }) 

              }>
        <Option value="MALE" >Male</Option>
        <Option  value="FEMALE">FeMale</Option>
        <Option value="Other">Other</Option>
      </Select>
            <Input
              label="Education"
              size="lg"
              type="text"
              value={user.education}
              onChange={(e) =>
                setUser({
                  name: user.name,
                  slug: user.slug,
                  gender:user.gender,
                  is_active:user.is_active,
                  email: user.email,
                  education: e.target.value,
                  address: user.address,
                  phone_no: user.phone_no,
                  password: user.password,
                })
              }
            />
            <Input
              label="Address"
              size="lg"
              type="text"
              value={user.address}
              onChange={(e) =>
                setUser({
                  name: user.name,
                  slug: user.slug,
                  email: user.email,
                  gender:user.gender,
                  is_active:user.is_active,
                  education: user.education,
                  address: e.target.value,
                  phone_no: user.phone_no,
                  password: user.password,
                })
              }
            />
            <Input
              label="Phone-no"
              size="lg"
              type="number"
              value={user.phone_no}
              onChange={(e) =>
                setUser({
                  name: user.name,
                  slug: user.slug,
                  gender:user.gender,
                  is_active:user.is_active,
                  email: user.email,
                  education: user.education,
                  address: user.address,
                  phone_no: e.target.value,
                  password: user.password,
                })
              }
            />

            <Input
              label="Password"
              size="lg"
              required
              value={user.password}
              onChange={(e) =>
                setUser({
                  name: user.name,
                  slug: user.slug,
                  gender:user.gender,
                  is_active:user.is_active,
                  email: user.email,
                  education: user.education,
                  address: user.address,
                  phone_no: user.phone_no,
                  password: e.target.value,
                })
              }
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={() => handleSubmit(user)}
            >
              Sign Up
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Already have account?
              <Typography
                variant="small"
                color="blue"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
