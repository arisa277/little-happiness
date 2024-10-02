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
  markdownFile?: string;
  fileContent?: string;
  assets: string[];
  date: string;
  category: string;
};

export type BlogsResponse = {
  [category: string]: BlogEntry;
};
