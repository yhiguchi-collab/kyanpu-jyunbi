# キャンプ準備アプリ

7人で 2026年6月6日のキャンプに向けて、食べ物・飲み物の希望を収集・集計するWebアプリ。

## 技術スタック

- React 18 + Vite
- localStorage（データ保存）
- Chart.js（円グラフ）
- GitHub Pages（ホスティング）

## ディレクトリ構成

```
kyanpu-jyunbi/
├── src/
│   ├── App.jsx               # ルートコンポーネント（状態管理）
│   ├── components/
│   │   ├── EntryForm.jsx     # 入力フォーム
│   │   ├── SummaryView.jsx   # 集計・円グラフ
│   │   └── ShoppingList.jsx  # 買い物チェックリスト
│   └── utils/
│       └── storage.js        # localStorage 操作
└── index.html
```

## 動作確認

```bash
npm run dev
```

## GitHub Pages へのデプロイ

```bash
npm run deploy
```

公開URL: https://yhiguchi-collab.github.io/kyanpu-jyunbi/

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

- `node_modules/` や OS 生成ファイル（`desktop.ini` 等）はコミットしない
