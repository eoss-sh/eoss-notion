import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { post, posts, blocks } from "../../lib/notion";
import { Path } from "../../interfaces/paths";
interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id
  let page_result = await post(id);
  // Fetch the post
  let { results } = await blocks(id);
  // Get the children
  return {
    props: {
      id,
      post: page_result,
      blocks: results,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = await posts();
  // Get all posts
  return {
    paths: results.map((post) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          id: post.id,
        },
      };
    }),
    fallback: false,
  };
};

interface Props {
  id: string;
  post: any;
  blocks: [any];
}

const renderBlock = (block: any) => {
  switch (block.type) {
    case "heading_1":
      // For a heading
      return <h1>{block["heading_1"].rich_text[0].text.content} </h1>;
    case "image":
      // For an image
      return <h1>Image</h1>;
    case "bulleted_list_item":
      // For an unordered list
      return (
        <ul>
          <li>{block["bulleted_list_item"].rich_text[0]?.text?.content} </li>
        </ul>
      );
    case "paragraph":
      // For a paragraph
      return <p>{block["paragraph"].rich_text[0]?.text?.content} </p>;
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

const SinglePost: NextPage<Props> = ({ id, post, blocks }) => {
  return (
    <div>
      <Head>
        <title>{post.properties.Content.title[0].plain_text}</title>
      </Head>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </div>
      {blocks.map((block, index) => {
        return <div key={index}>{renderBlock(block)}</div>;
      })}
    </div>
  );
};

export default SinglePost;
