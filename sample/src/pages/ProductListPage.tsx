// ProductList.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const styles = {
  container: css`
    padding: 20px;
  `,
}

const ProductList = () => {
  return (
    <div css={styles.container}>
      <h2>Product List</h2>
      {/* 商品一覧をここに表示 */}
    </div>
  )
}

export default ProductList
