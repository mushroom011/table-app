import { useState } from "react";
import TableFilter from "../../components/table-filter";
import Table from "../../components/table";
import Modal from "../../components/modal";
import EditForm from "../../components/edit-form";
import PRICE_PLANS from "../../data/price-plans";
import { IPricePlan } from "../../types";

export default function PricePlans() {
  const [pricePlans, setPricePlans] = useState<IPricePlan[]>(PRICE_PLANS)
  const [term, setTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPricePlan, setCurrentPricePlan] = useState<IPricePlan | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSavePages = (id: number) => (description: string) => {
    setPricePlans((prevPricePlans) => {
      return prevPricePlans.map((pricePlan) => {
        return pricePlan.id === id ? { ...pricePlan, description } : pricePlan;
      });
    });
    setCurrentPricePlan(null);
    setIsOpen(false);
  };

  const handleEditClick = (page: IPricePlan) => {
    setIsOpen(true);
    setCurrentPricePlan(page);
  };

  const getSearchPages = (term: string, pages: IPricePlan[]) => {
    if (!term) return pages;
    return pages.filter((item) =>
      item.description.toUpperCase().includes(term.toUpperCase())
    );
  };

  const onSearch = (term: string) => {
    setTerm(term);
  };

  const getFilterData = (filterValue: string, items: IPricePlan[]) => {
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

  const initValue = currentPricePlan !== null ? currentPricePlan.description : "";
  const id = currentPricePlan !== null ? currentPricePlan.id : 0;

  const filterPricePlans = getFilterData(filterValue, pricePlans);
  const visiblePricePlans = getSearchPages(term, filterPricePlans);

  return (
    <div>
      <h2>Price Plans</h2>
      <TableFilter onSearch={onSearch} onFilter={onFilter} />
      <Table items={visiblePricePlans} onEdit={handleEditClick} />
      <Modal isOpen={isOpen} onClose={setIsOpen} title="Edit">
        <EditForm initValue={initValue} labelText={"Description"} onSave={handleSavePages(id)} />
      </Modal>
    </div>
  );
}
