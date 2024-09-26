export type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO形式のDate型でもOK
  updatedAt?: string; // オプショナルな更新日付
  tags?: string[]; // オプショナルなタグ
  category?: string; // オプショナルなカテゴリ
  isPublished: boolean; // 公開フラグ
  comments?: Array<{
    author: string;
    content: string;
    createdAt: string;
  }>;
};

export type BlogEntry = {
  markdownFile?: string; // Markdown ファイルのパス
  fileContent?: string;  // Markdown ファイルの内容を文字列として読み込む
  assets: string[];      // 画像などのアセットファイルのパス
};

export type BlogsResponse = {
  [category: string]: BlogEntry;
};
