import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

async function posts() {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
  });
  return myPosts;
}

async function post(id: string) {
  const myPost = await notion.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

async function blocks(id: string) {
  const myBlocks = await notion.blocks.children.list({
    block_id: id,
  });
  return myBlocks;
}

export { posts, post, blocks };
