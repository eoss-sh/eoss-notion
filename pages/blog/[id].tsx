import { Client } from "@notionhq/client";
import { Path } from "../../interfaces/paths";

type Paths = Path[];

const SingleBlog = ({ blogs }: any) => {
  return <pre>{JSON.stringify(blogs, null, 2)}</pre>;
};

// Function to get all Paths for all DB Entries
export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE || "",
  });

  const paths: Paths = [];

  posts.results.forEach((post) => {
    paths.push({
      params: {
        id: post.id,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }: Path) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const response = await notion.pages.retrieve({
    page_id: id,
  });

  const blocks = await notion.blocks.children.list({
    block_id: id,
  });

  let title = "";

  if ("properties" in response) {
    if ("title" in response.properties.Content) {
      title = response.properties.Content.title[0].plain_text;
    }
    const content = "";
  }
  return {
    props: {
      blogs: blocks,
    },
  };
};

export default SingleBlog;
