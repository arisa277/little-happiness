import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import matter from 'gray-matter';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/content', express.static(path.join(__dirname, 'content')));

// ディレクトリ内のファイルを再帰的に取得
const getMarkdownFilesWithAssets = (dir: string) => {
  const result: { [key: string]: { markdownFile?: string, fileContent?: string, assets?: string[], date: string, category: string } } = {};

  // サブディレクトリごとに処理
  fs.readdirSync(dir).forEach((fileOrDir) => {
    const fullPath = path.join(dir, fileOrDir);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // ディレクトリ内の Markdown ファイルと他のファイルを取得
      const filesInDir = fs.readdirSync(fullPath);
      const markdownFile = filesInDir.find(file => file.endsWith('.md'));
      const assets = filesInDir.filter(file => !file.endsWith('.md'));

      let fileContent: string | undefined = undefined;
      let category: string = '';

      // Markdown ファイルが存在する場合、その中身を読み込む
      if (markdownFile) {
        const markdownPath = path.join(fullPath, markdownFile);
        try {
          fileContent = fs.readFileSync(markdownPath, 'utf8'); // ファイルの内容を文字列として読み込む
          // `gray-matter` を使ってフロントマターをパース
          const parsed = matter(fileContent);
          category = parsed.data.category;
          fileContent = parsed.content;
        } catch (err) {
          console.error(`Error reading file ${markdownPath}:`, err);
        }
      }

      // ファイル名の日付を取得
      const date = markdownFile?.split('.')[0];

      result[fileOrDir] = {
        markdownFile: markdownFile ? path.join(fullPath, markdownFile) : undefined,
        fileContent,
        date: date || '',
        category,
        assets: assets.map(asset => path.join(fullPath, asset)),
      };
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
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as typeof filesWithAssets);

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
