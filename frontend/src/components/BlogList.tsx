import { useGetBlogsQuery } from "../services/blogApi";
import BlogContent from "./BlogContent";
import "../index.css"

const BlogList = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();
  console.log(blogs, "blogs", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      {/* 取得したデータを表示 */}
      {blogs && Object.entries(blogs).map(([category, { markdownFile, fileContent, assets }]) => (
        <div key={category}>
          {/* <h2>{category}</h2> */}
          {markdownFile && (
            <BlogContent category={category} markdownFile={markdownFile} fileContent={fileContent} assets={assets} />
          )}
        </div>
      ))}
    </div>
  )
}

export default BlogList