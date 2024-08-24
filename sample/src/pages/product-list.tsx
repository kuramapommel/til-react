// ProductList.tsx
/** @jsxImportSource @emotion/react */
import ProductAdditionForm from '@/components/molecules/forms/products/product-addition-form'
import ProductDeletionForm from '@/components/molecules/forms/products/product-deletion-form'
import ProductEditingForm from '@/components/molecules/forms/products/product-editing-form'
import Modal from '@/components/molecules/modals/modal'
import TenantsTemplate from '@/components/templates/tenants-template'
import { useProducts } from '@/hooks/use-products'
import { getProductsAndRefresh } from '@/reducks/products/selectors'
import { Product } from '@/reducks/products/types'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

const styles = {
  button: css`
    margin-bottom: 20px;
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `,
  dialog: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  `,
}

const ProductList: React.FC = () => {
  const { products, refresh } = useProducts(getProductsAndRefresh)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <TenantsTemplate>
      <h2>Product List</h2>
      <button css={styles.button} onClick={() => setIsModalOpen(true)}>
        新規作成
      </button>

      {isDeleteDialogOpen && productToDelete && (
        <div css={styles.overlay}>
          <div css={styles.dialog}>
            <ProductDeletionForm
              selectedProduct={productToDelete}
              handleCancel={() => setIsDeleteDialogOpen(false)}
              afterSubmit={() => setIsDeleteDialogOpen(false)}
            />
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <ProductAdditionForm afterSubmit={() => setIsModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen && !!currentProduct}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <ProductEditingForm
          initialCurrentProduct={
            // todo これはあまりにナンセンスなので、必ず修正する
            currentProduct || {
              id: 0,
              name: '',
              image: '',
              price: 0,
              description: '',
            }
          }
          handleCancel={() => {
            setIsEditModalOpen(false)
            setCurrentProduct(null)
          }}
          afterSubmit={() => {
            setIsEditModalOpen(false)
            setCurrentProduct(null)
          }}
        />
      </Modal>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>価格: {product.price.toLocaleString()}円</p>
            <p>{product.description}</p>
            <button
              onClick={() => {
                console.log(`product: ${JSON.stringify(product)}`)
                setCurrentProduct(product)
                setIsEditModalOpen(true)
              }}
            >
              編集
            </button>
            <button
              onClick={() => {
                setProductToDelete(product)
                setIsDeleteDialogOpen(true)
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </TenantsTemplate>
  )
}

export default ProductList
