"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title: title,
      desc: desc,
      userId: userId,
      slug: slug,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};

export const addUser = async (prevState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      img: img,
      isAdmin: isAdmin,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};

export const handleGitHubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match." };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username: username });

    if (user) {
      return { error: "Username already exists." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      img: img,
    });

    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    connectToDb();
  } catch (error) {
    console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    } else {
      throw error;
    }
  }
};
