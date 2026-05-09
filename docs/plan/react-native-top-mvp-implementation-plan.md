# React Native Top MVP Implementation Plan

個人ブログのトップ画面を React Native へ移植するための MVP 実装計画。

この計画では、まずトップ画面として成立する見た目とプロフィール体験を優先する。ステッカー装飾、外部リンク、音声再生は後続フェーズに回す。

## Goal

MVP では、以下の見た目と操作を React Native 上で確認できる状態にする。

- 黒背景と背景グリッド
- ロゴ風の丸アイコンとタイトルを持つヘッダー
- 実画像のプロフィール画像
- glass 風プロフィールカード
- プロフィール文言のタイプライター表示
- 前へ / 次へによるプロフィールカード切り替え
- `1 / 7` 形式のページネーション
- 右下の Credit 表示

確認対象は iOS シミュレーターを優先する。

## MVP Scope

### Included

- `features/top/` 配下の画面・コンポーネント構成
- `topDesignTokens` の定義
- `topContent` の定義
- `react-native-svg` を使った背景グリッド
- `/assets/my-picture.webp` の React Native プロジェクトへの持ち込み
- `webp` 形式のままプロフィール画像表示
- 半透明背景、白い枠線、shadow / elevation による glass 表現
- タイプライター表示
- reduced motion 対応
- 前後ナビゲーション
- 基本的なアクセシビリティ対応
- リンクなしの Credit 表示

### Not Included

- ステッカー装飾
- ステッカーのタップアニメーション
- ステッカーの音声再生
- X / GitHub / Credit の外部リンク
- `Kosuke Agent`
- Agent タブ構造
- ブログ検索、ロードマップ、デザインシステムなど他画面へのナビゲーション
- Android の初回確認
- `BlurView` による glass 表現
- Skia による背景描画

## Dependencies

MVP で追加する依存は以下。

- `react-native-svg`

背景グリッドは `react-native-svg` で描画する。Skia は MVP では使わない。

## Suggested File Structure

```txt
features/top/
  components/
    credit-link.tsx
    grid-background.tsx
    profile-card-controls.tsx
    profile-card-text.tsx
    profile-hero.tsx
    top-header.tsx
  constants/
    top-content.ts
    top-design-tokens.ts
  hooks/
    use-profile-card.ts
    use-reduced-motion.ts
    use-typewriter.ts
  screens/
    top-screen.tsx
```

ルーティング接続は MVP の画面コンポーネント作成後に行う。まずは `features/top/screens/top-screen.tsx` を中心に実装する。

## Component Responsibilities

### `TopScreen`

- 画面全体の root
- Safe Area を考慮する
- 黒背景を敷く
- `GridBackground`、`TopHeader`、`ProfileHero`、`CreditLink` を配置する

### `TopHeader`

- ロゴ風の丸アイコンを表示する
- `タムサイト テックブログ` を表示する
- MVP ではナビゲーションリンクを持たない

### `GridBackground`

- `react-native-svg` で 40px 間隔の縦横グリッドを描画する
- 背景色は黒系にする
- グリッド線は薄い白の半透明色にする
- タップ対象にはしない

### `ProfileHero`

- プロフィール画像とプロフィールカードを中央に配置する
- 画面幅に応じてプロフィール画像サイズを切り替える
- プロフィールカードの状態と表示をまとめる

### `ProfileCardText`

- 現在のプロフィール文言をタイプライター表示する
- reduced motion が有効な場合は全文を即時表示する
- 表示中はカーソル相当の `|` を表示する

### `ProfileCardControls`

- 前へ / 次へボタンを表示する
- `current / total` のページネーションを表示する
- タイプライター表示中はボタンを disabled にする
- 前後移動はループ式にする

### `CreditLink`

- `Inspired by hey.milo.gg - Thank you!` を右下に表示する
- MVP ではリンク動作を持たない

## State Design

MVP では Agent タブを持たず、プロフィール表示に必要な状態だけを持つ。

```ts
type ProfileState = {
  currentIndex: number
  isTyping: boolean
}
```

前後ナビゲーションは以下のループ式にする。

```ts
const nextIndex = (currentIndex + 1) % totalCards
const previousIndex = (currentIndex - 1 + totalCards) % totalCards
```

## Implementation Steps

1. `react-native-svg` を追加する
2. `features/top/` のディレクトリを作る
3. `top-design-tokens.ts` を作る
4. `top-content.ts` を作る
5. `my-picture.webp` を React Native プロジェクトの asset 配下に配置する
6. `TopScreen` の土台を作る
7. `GridBackground` を実装する
8. `TopHeader` を実装する
9. `ProfileHero` でプロフィール画像を表示する
10. glass 風のプロフィールカードを表示する
11. `useReducedMotion` を実装する
12. `useTypewriter` を実装する
13. `ProfileCardText` を実装する
14. `useProfileCard` を実装する
15. `ProfileCardControls` を実装する
16. `CreditLink` を表示する
17. アクセシビリティ属性を整える
18. iOS シミュレーターで見た目と操作を確認する

## Accessibility Requirements

MVP でも以下は対応する。

- プロフィール画像に `accessibilityLabel` を付ける
- 前へボタンに `accessibilityRole="button"` とラベルを付ける
- 次へボタンに `accessibilityRole="button"` とラベルを付ける
- disabled 状態を `accessibilityState` で表現する
- Credit は必要に応じて通常テキストとして読み上げ可能にする
- reduced motion が有効な場合はタイプライターを即時表示する

## Acceptance Criteria

- iOS シミュレーターでトップ画面コンポーネントを表示できる
- 黒背景が表示される
- 背景グリッドが表示される
- ヘッダーにロゴ風の丸アイコンとタイトルが表示される
- プロフィール画像が円形で表示される
- プロフィールカードが glass 風に表示される
- プロフィール文言がタイプライター表示される
- reduced motion が有効な場合、プロフィール文言が即時表示される
- タイプライター表示中は前へ / 次へボタンが無効になる
- 前へ / 次へボタンでカードがループ切り替えされる
- ページネーションが `1 / 7` 形式で表示される
- 右下に Credit が表示される
- 基本的な accessibility label と disabled 状態が設定されている

## Follow-up Phase Candidates

MVP 後に以下を追加する。

- ステッカー装飾
- ステッカーのタップアニメーション
- 犬ステッカーの音声再生
- X / GitHub / Credit の外部リンク
- Android での見た目確認
- ルーティング接続
- `BlurView` や gradient を使った glass 表現の強化
- スマホ向けステッカー表示方針の再検討
