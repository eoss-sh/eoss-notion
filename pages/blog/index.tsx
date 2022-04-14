import { Client } from "@notionhq/client";
import Link from "next/link";

const Blog = ({ blogs }: any) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      {blogs.results.map((blog: any, index: number) => {
        return (
          <section className="blog" key={index}>
            <div>{blog.properties.Content.title[0].text.content}</div>
            <div>{blog.id}</div>
          </section>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE || "",
  });

  return {
    props: {
      blogs: posts,
    },
  };
};

export default Blog;
