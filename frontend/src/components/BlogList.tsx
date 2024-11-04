import { useGetBlogsQuery } from '../services/blogApi';
import BlogContent from './BlogContent';
import '../index.css';

const BlogList = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();
  console.log(blogs);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      {/* 取得したデータを表示 */}
      {blogs &&
        Object.entries(blogs).map(
          ([category, { title, date, markdownFile, fileContent, assets }]) => (
            <div key={category}>
              {markdownFile && (
                <BlogContent
                  category={category}
                  date={date}
                  fileContent={fileContent}
                  assets={assets}
                  title={title}
                />
              )}
            </div>
          )
        )}
    </div>
  );
};

export default BlogList;
