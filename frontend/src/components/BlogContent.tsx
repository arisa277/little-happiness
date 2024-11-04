import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  date: string;
  title: string;
  category: string;
  fileContent?: string;
  assets?: string[];
}

// TODO この URL は環境変数から取得するように変更
const url = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const BlogContent: React.FC<BlogContentProps> = ({
  date,
  title,
  fileContent,
  assets,
}) => {
  // 画像の絶対パスをサーバーから提供されるパスに変換
  const getImagePath = (absolutePath: string) => {
    // 画像ファイル名を取得し、サーバーのルートに合わせてパスを作成
    const relativePath = absolutePath.split('/content/').pop(); // `content` 以下のパスを取得
    return `${url}/content/${relativePath}`;
  };

  let modifiedContent = fileContent;

  if (assets && modifiedContent) {
    assets.forEach((asset) => {
      const imagePath = getImagePath(asset); // パス変換
      const assetName = asset.split('/').pop(); // ファイル名取得

      // マークダウン内で画像のパスを置き換え
      modifiedContent = (modifiedContent ?? '').replace(
        new RegExp(`!\\[.*\\]\\(${assetName}\\)`, 'g'),
        `![${assetName}](${imagePath})`
      );
    });
  }

  // 画像のレンダリングをカスタマイズ
  const components = {
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <img src={src} alt={alt} loading="lazy" />
    ),
  };

  return (
    <>
      {modifiedContent && (
        <div className="markdown">
          <p className="ml-3 mt-16 text-xs">{date}</p>
          <h1>{title}</h1>
          {/* カスタムレンダラーを使用 */}
          <ReactMarkdown components={components}>
            {modifiedContent}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default BlogContent;
