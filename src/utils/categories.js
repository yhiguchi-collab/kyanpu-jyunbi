export const CATEGORY_COLORS = {
  'アルコール':    '#FF6B6B',
  'ノンアルコール': '#4ECDC4',
  'お肉':         '#FF9F40',
  '野菜':         '#96CEB4',
  '海鮮':         '#45B7D1',
  'その他':        '#C39BD3',
}

const ALCOHOL = ['ビール', 'チューハイ', 'ハイボール', '日本酒', 'ワイン', '焼酎', 'サワー',
  'カクテル', 'ウイスキー', '梅酒', 'ジン', 'テキーラ', 'ラム', 'リキュール',
  'シャンパン', 'スパークリング', 'ブランデー', 'アルコール', '酎ハイ']

const NON_ALCOHOL = ['コーラ', 'ジュース', 'お茶', '緑茶', '烏龍茶', 'ウーロン茶', '麦茶',
  '水', 'コーヒー', '紅茶', 'ミルク', '牛乳', 'レモネード', 'ポカリ', 'アクエリアス',
  'ノンアル', 'ソーダ', 'スポーツドリンク', 'オレンジ', 'りんご', 'ぶどう']

const MEAT = ['焼き肉', '牛肉', '豚肉', '鶏肉', '羊肉', 'ラム', 'ホルモン', 'ウインナー',
  'ソーセージ', 'ハンバーグ', 'ステーキ', 'タン', '焼き鳥', 'スペアリブ', 'ベーコン',
  'バーベキュー', 'BBQ', 'お肉', '肉', '鶏', '豚', '牛']

const VEGGIE = ['とうもろこし', 'ピーマン', 'キャベツ', '玉ねぎ', 'なす', 'じゃがいも',
  'パプリカ', 'アスパラ', 'ズッキーニ', 'きのこ', 'しいたけ', 'もやし', 'ブロッコリー',
  'レタス', 'トマト', '野菜', 'サラダ', 'えのき', 'ねぎ']

const SEAFOOD = ['エビ', 'ホタテ', 'イカ', 'タコ', 'サーモン', '鮭', 'マグロ', 'シーフード',
  'カニ', 'アサリ', 'ハマグリ', '牡蠣', 'ウニ', 'イクラ', '魚', '海鮮', 'さんま', 'さば']

export function classifyDrink(name) {
  if (ALCOHOL.some(kw => name.includes(kw))) return 'アルコール'
  if (NON_ALCOHOL.some(kw => name.includes(kw))) return 'ノンアルコール'
  return 'その他'
}

export function classifyFood(name) {
  if (MEAT.some(kw => name.includes(kw))) return 'お肉'
  if (VEGGIE.some(kw => name.includes(kw))) return '野菜'
  if (SEAFOOD.some(kw => name.includes(kw))) return '海鮮'
  return 'その他'
}
