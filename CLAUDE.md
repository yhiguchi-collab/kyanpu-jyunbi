# キャンプ準備アプリ

7人で 2026年6月6日のキャンプに向けて、食べ物・飲み物の希望を収集・集計するWebアプリ。

## 技術スタック

- React 18 + Vite
- Firebase Realtime Database（複数デバイスからのリアルタイム共有）
- Chart.js（円グラフ）
- GitHub Pages（ホスティング）

## ディレクトリ構成

```
kyanpu-jyunbi/
├── index.html
├── src/
│   ├── App.jsx               # ルートコンポーネント（状態管理）
│   ├── components/
│   │   ├── EntryForm.jsx     # 入力フォーム
│   │   ├── SummaryView.jsx   # 集計・円グラフ
│   │   └── ShoppingList.jsx  # 買い物チェックリスト
│   └── utils/
│       ├── db.js             # Firebase Realtime Database 操作
│       └── storage.js        # localStorage（チェック状態のみ）
├── .env.local                # Firebase 設定（要作成・git管理外）
└── .env.local.example        # 設定ファイルのテンプレート
```

## Firebase セットアップ

アプリを複数デバイスで使うには Firebase の設定が必要です。

### 1. Firebase プロジェクト作成

1. https://console.firebase.google.com にアクセス
2. 「プロジェクトを作成」→ 任意の名前で作成
3. Google アナリティクスは「無効」で問題なし

### 2. Realtime Database の有効化

1. 左メニュー「構築」→「Realtime Database」
2. 「データベースを作成」
3. ロケーションは「asia-southeast1（シンガポール）」を選択
4. セキュリティルールは「テストモードで開始」→「有効にする」

### 3. Web アプリの登録

1. 左上の歯車アイコン →「プロジェクトの設定」
2. 「マイアプリ」→「</>」（Webアプリ）をクリック
3. アプリのニックネームを入力して「アプリを登録」
4. 表示される `firebaseConfig` の各値をコピー

### 4. 設定ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成し、コピーした値を貼り付ける：

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
```

### 5. デプロイ

```bash
npm run deploy
```

## コーディング規約

- インデントはスペース 2 つ
- セミコロンあり
- `const` / `let` を使用し `var` は禁止
- コメントは WHY が自明でない箇所のみ（日本語可）

## Git 運用ルール

### 基本方針

**コードを変更するたびに、必ず GitHub へプッシュすること。**

ローカルコミットのみで作業を終わらせない。変更 → コミット → プッシュを 1 セットとする。

### 手順

1. 変更をステージング
   ```bash
   git add <変更ファイル>
   ```
2. コミット（日本語で変更内容を簡潔に記述）
   ```bash
   git commit -m "変更内容の説明"
   ```
3. GitHub へプッシュ
   ```bash
   git push origin main
   ```

### コミットメッセージ規約

- 日本語で記述してよい
- 変更の「何を」「なぜ」が伝わる内容にする
- 例: `チェックリスト追加機能を実装`、`バグ修正: 集計が反映されない問題`

### 注意事項

- `.env.local`（Firebase設定）は絶対にコミットしない（`.gitignore` で除外済み）
- `node_modules/` や OS 生成ファイル（`desktop.ini` 等）はコミットしない

## 開発サーバー起動

```bash
npm run dev
```

## GitHub Pages へのデプロイ

```bash
npm run deploy
```

公開URL: https://yhiguchi-collab.github.io/kyanpu-jyunbi/
