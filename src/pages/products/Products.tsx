import { useState } from "react";
import Table from "../../components/table";
import TableFilter from "../../components/table-filter";
import Modal from "../../components/modal";
import EditForm from "../../components/edit-form";
import PRODUCTS from "../../data/products";
import {IProduct} from '../../types';

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS)
  const [term, setTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSavePages = (id: number) => (name: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        return product.id === id ? { ...product, name } : product;
      });
    });
    setCurrentProduct(null);
    setIsOpen(false);
  };

  const handleEditClick = (page: IProduct) => {
    setIsOpen(true);
    setCurrentProduct(page);
  };

  const getSearchPages = (term: string, pages: IProduct[]) => {
    if (!term) return pages;
    return pages.filter((item) =>
      item.name.toUpperCase().includes(term.toUpperCase())
    );
  };

  const onSearch = (term: string) => {
    setTerm(term);
  };

  const getFilterData = (filterValue: string, items: IProduct[]) => {
    if(filterValue === 'not active'){
        return items.filter(item => !item.active);
    } else if(filterValue === 'active'){
        return items.filter(item => item.active);
    }
    return items;
}

  const onFilter = (filterValue: string) => {
    setFilterValue(filterValue)
  };

  const initValue = currentProduct !== null ? currentProduct.name : "";
  const id = currentProduct !== null ? currentProduct.id : 0;

  const filterProducts = getFilterData(filterValue, products);
  const visibleProducts = getSearchPages(term, filterProducts);

  return (
    <div>
      <h2>Products</h2>
      <TableFilter onSearch={onSearch} onFilter={onFilter} />
      <Table items={visibleProducts} onEdit={handleEditClick} />
      <Modal isOpen={isOpen} onClose={setIsOpen} title="Edit">
        <EditForm initValue={initValue} labelText={"Name"} onSave={handleSavePages(id)} />
      </Modal>
    </div>
  );
}
