import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import matter from 'gray-matter';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/content', express.static(path.join(__dirname, 'content')));

type FrontMatter = {
  title: string;
  category: string;
  tags: [string];
};

type BlogPost = {
  markdownFile?: string;
  fileContent?: string;
  assets?: string[];
  date: string;
  title: string;
  category: string;
};

// Markdown ファイルのフロントマターと内容を読み込む関数
const parseMarkdownFile = (
  filePath: string
): { frontMatter: FrontMatter; content: string } | null => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { frontMatter: data as FrontMatter, content };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

// ディレクトリ内の Markdown ファイルとアセットを取得する関数
const getMarkdownFilesWithAssets = (
  dir: string
): { [key: string]: BlogPost } => {
  const result: { [key: string]: BlogPost } = {};

  fs.readdirSync(dir).forEach((fileOrDir) => {
    const fullPath = path.join(dir, fileOrDir);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const filesInDir = fs.readdirSync(fullPath);
      const markdownFile = filesInDir.find((file) => file.endsWith('.md'));
      const assets = filesInDir.filter((file) => !file.endsWith('.md'));

      if (markdownFile) {
        const markdownPath = path.join(fullPath, markdownFile);
        const parsed = parseMarkdownFile(markdownPath);

        if (parsed) {
          const { frontMatter, content } = parsed;
          result[fileOrDir] = {
            markdownFile: markdownPath,
            fileContent: content,
            date: markdownFile.split('.')[0],
            title: frontMatter.title,
            category: frontMatter.category,
            assets: assets.map((asset) => path.join(fullPath, asset)),
          };
        }
      }
    }
  });

  return result;
};

// エンドポイントで Markdown ファイルとアセットのリストを返す
app.get('/blogs', (req: Request, res: Response) => {
  const contentDir = path.join(__dirname, 'content');
  try {
    const filesWithAssets = getMarkdownFilesWithAssets(contentDir);

    // オブジェクトを配列に変換して日付でソート
    const sortedFiles = Object.entries(filesWithAssets)
      .sort(([, a], [, b]) => {
        // 日付を比較して降順に並べる (新しい順)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as typeof filesWithAssets
      );

    res.json(sortedFiles);
  } catch (err) {
    res.status(500).send('Error reading directory');
  }
});

app.put('/blogs/:fileName', (req: Request, res: Response) => {
  console.log(req.params.fileName);
  res.send('Update an existing blog');
});

app.delete('/blogs/:filenName', (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send('Delete a blog');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
