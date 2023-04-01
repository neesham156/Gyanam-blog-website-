
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Example() {
  const [use, setUser] = useState<any>({ email: "", password: "" });
  const router = useRouter();
  const handleLogin = async (val: any) => {
    signIn("credentials", {
      username: val.email,
      password: val.password,
      redirect: false,
    })
      .then((data) => {
     
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            type="email"
            value={use.email}
            onChange={({ target }) => {
              setUser({
                email: target.value,
                password: use.password,
              });
            }}
            required
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            value={use.password}
            required
            onChange={({ target }) => {
              setUser({
                email: use.email,
                password: target.value,
              });
            }}
          />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={(e) => {
              handleLogin(use);
            }}
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Dont have an account?
            <Typography
              variant="small"
              color="blue"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
