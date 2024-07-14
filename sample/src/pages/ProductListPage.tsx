// ProductList.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

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
const initialState = {
  id: 0,
  name: '',
  image: '',
  price: 0,
  description: '',
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Product>(initialState)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? Number(value) : value,
    }))
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((id) => {
        setProducts((prevProducts) => [...prevProducts, { ...newProduct, id }])
      })
      .catch((error) => console.error('Error adding product:', error))
    setIsModalOpen(false)
    setNewProduct(initialState)
  }

  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [name]: name === 'price' ? Number(value) : value,
      })
    }
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentProduct) {
      fetch(`/api/product/${currentProduct.id.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((id) => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === id ? currentProduct : product,
            ),
          )
        })
        .catch((error) => console.error('Error adding product:', error))
    }
    setIsEditModalOpen(false)
    setCurrentProduct(null)
  }

  const handleDeleteProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (productToDelete) {
      fetch(`/api/product/${productToDelete.id.toString()}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((id) => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id),
          )
        })
        .catch((error) => console.error('Error deleting product:', error))
    }
    setIsDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  return (
    <div css={styles.container}>
      <h2>Product List</h2>
      <button css={styles.button} onClick={() => setIsModalOpen(true)}>
        新規作成
      </button>

      {isDeleteDialogOpen && productToDelete && (
        <div css={styles.overlay}>
          <div css={styles.dialog}>
            <form onSubmit={handleDeleteProduct}>
              <p>{productToDelete.name}を本当に削除しますか？</p>
              <button type="submit">削除する</button>
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                キャンセル
              </button>
            </form>
          </div>
        </div>
      )}
      {isModalOpen && (
        <>
          <div css={styles.overlay} onClick={() => setIsModalOpen(false)} />
          <div css={styles.modal}>
            <form onSubmit={handleAddProduct}>
              <h2>新規作成モーダル</h2>
              <label>
                商品名:
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  aria-label="商品名"
                />
              </label>
              <label>
                商品単価:
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  aria-label="商品単価"
                />
              </label>
              <label>
                詳細:
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                  aria-label="詳細"
                />
              </label>
              <label>
                イメージURL:
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleNewProductChange}
                  aria-label="イメージURL"
                />
              </label>
              <button type="submit">作成</button>
            </form>
          </div>
        </>
      )}
      {isEditModalOpen && currentProduct && (
        <>
          <div css={styles.overlay} onClick={() => setIsEditModalOpen(false)} />
          <div css={styles.modal}>
            <form onSubmit={handleSaveProduct}>
              <h2>編集モーダル</h2>
              <label>
                商品名:
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleEditProductChange}
                  aria-label="商品名"
                />
              </label>
              <label>
                商品単価:
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleEditProductChange}
                  aria-label="商品単価"
                />
              </label>
              <label>
                詳細:
                <input
                  type="text"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleEditProductChange}
                  aria-label="詳細"
                />
              </label>
              <label>
                イメージURL:
                <input
                  type="text"
                  name="image"
                  value={currentProduct.image}
                  onChange={handleEditProductChange}
                  aria-label="イメージURL"
                />
              </label>
              <button type="submit">保存</button>
              <button onClick={() => setIsEditModalOpen(false)}>
                キャンセル
              </button>
            </form>
          </div>
        </>
      )}
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
