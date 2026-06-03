# キャンプ準備アプリ

7人で 2026年6月6日のキャンプに向けて、食べ物・飲み物の希望を収集・集計するWebアプリ。

## 技術スタック

- React 18 + Vite
- Google Apps Script（データ保存・取得 API）
- Google スプレッドシート（データベース）
- Chart.js（円グラフ）
- GitHub Pages（ホスティング）

## ディレクトリ構成

```
kyanpu-jyunbi/
├── gas/
│   └── Code.gs               # GAS スクリプト（Google Apps Script にコピーして使う）
├── src/
│   ├── App.jsx               # ルートコンポーネント（状態管理・ポーリング）
│   ├── components/
│   │   ├── EntryForm.jsx     # 入力フォーム
│   │   ├── SummaryView.jsx   # 集計・円グラフ
│   │   └── ShoppingList.jsx  # 買い物チェックリスト
│   └── utils/
│       ├── api.js            # GAS API 呼び出し
│       └── storage.js        # localStorage（チェック状態のみ）
├── .env.local                # GAS URL 設定（要作成・git管理外）
└── .env.local.example        # 設定ファイルのテンプレート
```

## GAS セットアップ

アプリを複数デバイスで使うには GAS の設定が必要です（所要時間 約5分）。

### 1. Google スプレッドシートを作成

1. Google ドライブで新しいスプレッドシートを作成
2. シート名は何でも OK（GAS がシートを自動作成します）

### 2. GAS スクリプトを作成

1. スプレッドシートのメニュー「拡張機能」→「Apps Script」を開く
2. エディタに `gas/Code.gs` の内容をすべてコピー＆ペースト
3. 上部の「プロジェクトを保存」(Ctrl+S) をクリック

### 3. ウェブアプリとしてデプロイ

1. 右上の「デプロイ」→「新しいデプロイ」
2. 種類は「ウェブアプリ」を選択
3. 設定を以下の通りにする：
   - **次のユーザーとして実行**：自分（your email）
   - **アクセスできるユーザー**：**全員**
4. 「デプロイ」をクリック → Google アカウントで承認
5. 表示される「ウェブアプリの URL」をコピー

### 4. .env.local を作成

プロジェクトフォルダに `.env.local` ファイルを作成：

```
VITE_GAS_URL=https://script.google.com/macros/s/コピーしたID/exec
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

### 注意事項

- `.env.local`（GAS URL）は絶対にコミットしない（`.gitignore` で除外済み）
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
