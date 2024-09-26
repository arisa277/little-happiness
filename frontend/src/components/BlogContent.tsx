import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  category: string;
  markdownFile?: string;
  fileContent?: string;
  assets?: string[];
}

const BlogContent: React.FC<BlogContentProps> = ({ category, markdownFile, fileContent, assets }) => {
  return (
    <div>
      {fileContent && (
        <div className='markdown'>
          <ReactMarkdown>
            {fileContent}
          </ReactMarkdown>
          {assets?.map((asset: string) => (
            <img key={asset} src={asset} alt={asset} style={{ maxWidth: '100px' }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogContent;
