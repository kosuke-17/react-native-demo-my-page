import type { ImageSourcePropType } from 'react-native';

export const headerContent = {
  title: 'タムサイト テックブログ',
} as const;

export const creditContent = {
  label: 'Inspired by hey.milo.gg - Thank you!',
} as const;

export const profileCards = [
  {
    id: '0',
    catchCopy: 'ようこそ!! 岡村孝輔です。Webエンジニアです。',
  },
  {
    id: '1',
    catchCopy:
      '【エンジニアリング】目に見える価値提供が好きなので、フロントエンド領域が一番好きです。ですが、バックエンド(DDD)やインフラ(AWS)領域も携わってきました。',
  },
  {
    id: '2',
    catchCopy:
      '【エンジニアリング】チームの生産性を高めるのが好きで生産性可視化ツールやコードレビューMCPを作成したり、AI活用アセスメントシートを作ってAI活用の浸透を行っています。',
  },
  {
    id: '3',
    catchCopy:
      '【AI】最近はAIについての知的好奇心が強く、ローカルLLMで文字起こしツールを作ってみたり、TransformerをPyTorchで実装してみたりしました。',
  },
  {
    id: '4',
    catchCopy: '【趣味】サッカーが大好き。最近は町田ゼルビア推し。見るのもプレーするのも好き。',
  },
  {
    id: '5',
    catchCopy: '【趣味】寿司とつけ麺が大好物。自分で魚を捌いたりもします。',
  },
  {
    id: '6',
    catchCopy:
      '【趣味】犬が好きで、特にしば犬とコーギーが好き。長崎のコーギーカフェまで行きました。',
  },
] as const;

export type ProfileCard = (typeof profileCards)[number];

export const profileImageSource =
  require('../../../assets/images/my-picture.webp') as ImageSourcePropType;
