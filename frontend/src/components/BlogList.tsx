import { useGetBlogsQuery } from "../services/blogApi";
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown component

const BlogList = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();
  console.log(blogs, "blogs", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      {/* 取得したデータを表示 */}
      {blogs && Object.entries(blogs).map(([category, { markdownFile, assets }]) => (
        <div key={category}>
          <h2>{category}</h2>
          {markdownFile && (
            <div>
              <h3>Markdown File:</h3>
              <ReactMarkdown>{markdownFile}</ReactMarkdown>
            </div>
          )}
          <div>
            <h3>Assets:</h3>
            {assets.map((asset: string) => (
              <img key={asset} src={asset} alt={asset} style={{ maxWidth: '100px' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogList