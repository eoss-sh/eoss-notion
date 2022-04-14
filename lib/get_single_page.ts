import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const get_single_page = async (page_id: string) => {
  const page = await notion.blocks.children.list({
    block_id: page_id,
  });
  console.log(page);
};
