import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '../services/blogApi'; // RTK Query の設定があるファイルをインポート

export const store = configureStore({
  reducer: {
    // RTK Query API リデューサーをストアに追加
    [blogApi.reducerPath]: blogApi.reducer,
  },
  // RTK Query の middleware を追加
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

// ストアの型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
