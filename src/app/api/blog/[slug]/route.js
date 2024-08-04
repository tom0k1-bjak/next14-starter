import { NextResponse } from "next/server";
import { Post } from "../../../../../lib/models";
import { connectToDb } from "../../../../../lib/utils";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    const post = await Post.findOne({ slug: slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Post.deleteOne({ slug: slug });
    return NextResponse.json("Post deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post!");
  }
};
