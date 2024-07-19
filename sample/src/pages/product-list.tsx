// ProductList.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import ProductAdditionForm from '../components/molecules/forms/product-addition-form'
import ProductEditingForm from '../components/molecules/forms/product-editing-form'
import FormModal from '../components/molecules/modal/form-modal'
import ProductDeletionForm from '../components/molecules/forms/product-deletion-form'

const styles = {
  container: css`
    padding: 20px;
  `,
  button: css`
    margin-bottom: 20px;
  `,
  modal: css`
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

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  return (
    <div css={styles.container}>
      <h2>Product List</h2>
      <button css={styles.button} onClick={() => setIsModalOpen(true)}>
        新規作成
      </button>

      {isDeleteDialogOpen && productToDelete && (
        <div css={styles.overlay}>
          <div css={styles.dialog}>
            <ProductDeletionForm
              selectedProduct={productToDelete}
              handleResponse={(id) => {
                setProducts((prevProducts) =>
                  prevProducts.filter((product) => product.id !== id),
                )
              }}
              handleCancel={() => setIsDeleteDialogOpen(false)}
              afterSubmit={() => setIsDeleteDialogOpen(false)}
            ></ProductDeletionForm>
          </div>
        </div>
      )}

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductAdditionForm
          handleResponse={(product) => {
            setProducts((prevProducts) => [...prevProducts, product])
          }}
          afterSubmit={() => setIsModalOpen(false)}
        />
      </FormModal>

      <FormModal
        isOpen={isEditModalOpen && !!currentProduct}
        onClose={() => setIsEditModalOpen(false)}
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
          handleResponse={(newProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === newProduct.id ? newProduct : product,
              ),
            )
          }}
          handleCancel={() => {
            setIsEditModalOpen(false)
            setCurrentProduct(null)
          }}
          afterSubmit={() => {
            setIsEditModalOpen(false)
            setCurrentProduct(null)
          }}
        />
      </FormModal>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>価格: {product.price.toLocaleString()}円</p>
            <p>{product.description}</p>
            <button
              onClick={() => {
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
    </div>
  )
}

export default ProductList
