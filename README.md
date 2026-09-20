# Study Tracker

競技プログラミングの学習内容を記録し、復習状況を管理するWebアプリです。

問題ごとにDifficulty・タグ・ステータス・メモなどを保存し、検索・フィルタを使って学習内容を振り返ることができます。

## 主な機能

- 学習記録の登録・編集・削除
- MongoDBへのデータ保存
- キーワード検索
- ステータス・タグ・Difficultyによるフィルタ
- React Hook Formによる入力バリデーション
- バックエンド側での入力バリデーション
- Loading・エラー表示
- レスポンシブ対応

## 使用技術

### Frontend

- React
- JavaScript
- Vite
- React Hook Form
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

### Infrastructure

- Vercel
- Render
- MongoDB Atlas

## 工夫した点

- フロントエンドとバックエンドの両方で入力値を検証
- 元の学習記録を保持したまま、複数条件を組み合わせて検索・フィルタ
- Loadingや通信エラーを表示し、API通信中の状態が分かるUIを実装
- PC・スマートフォンの両方で利用できるレスポンシブUI

## ローカルでの起動

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

`.env` にMongoDBの接続情報やAPI URLなどの環境変数を設定する必要があります。

## 今後の改善予定

- バックエンドのroutes / controllersへの分割
- バリデーションライブラリの導入
- 検索・フィルタ処理のバックエンド化
- ユーザー登録・ログイン機能
- ユーザーごとの学習記録管理
- 学習データの分析・可視化
- TypeScript対応
- テストの追加
