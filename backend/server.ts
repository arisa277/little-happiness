import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// ディレクトリ内のファイルを再帰的に取得
const getMarkdownFilesWithAssets = (dir: string) => {
  const result: { [key: string]: { markdownFile?: string, assets: string[] } } = {};

  // サブディレクトリごとに処理
  fs.readdirSync(dir).forEach((fileOrDir) => {
    const fullPath = path.join(dir, fileOrDir);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // ディレクトリ内の Markdown ファイルと他のファイルを取得
      const filesInDir = fs.readdirSync(fullPath);
      const markdownFile = filesInDir.find(file => file.endsWith('.md'));
      const assets = filesInDir.filter(file => !file.endsWith('.md'));

      result[fileOrDir] = {
        markdownFile: markdownFile ? path.join(fullPath, markdownFile) : undefined,
        assets: assets.map(asset => path.join(fullPath, asset)),
      };
    }
  });

  return result;
};

// エンドポイントで Markdown ファイルとアセットのリストを返す
app.get('/blogs', (req, res) => {
  const contentDir = path.join(__dirname, 'content');
  try {
    const filesWithAssets = getMarkdownFilesWithAssets(contentDir);
    res.json(filesWithAssets);
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
