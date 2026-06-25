import { getServerSession } from "next-auth";

import User from "@/models/User";
import connectDB from "./connectDB";

async function checkIsSignedIn() {
  const data = await getServerSession();
  if (!data?.user?.email) {
    return false;
  }

  let usersEmail = null;

  try {
    const isConnected = await connectDB();
    if (!isConnected) return false;

    const user = await User.findOne({ email: data.user.email }).lean();
    if (user) {
      usersEmail = { email: data.user.email };
    } else {
      usersEmail = false;
    }
  } catch (err) {
    console.log(err);
    usersEmail = false;
  }

  return usersEmail;
}

async function getUserDatas(userDatas) {
  try {
    const isConnected = await connectDB();
    if (!isConnected) return false;

    const user = await User.findOne(userDatas);
    if (user) return user;

    return false;
  } catch (err) {
    return false;
  }
}

export { checkIsSignedIn, getUserDatas };
