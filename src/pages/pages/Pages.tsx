import { useState } from "react";
import Table from "../../components/table";
import TableFilter from "../../components/table-filter";
import Modal from "../../components/modal";
import EditForm from "../../components/edit-form";
import PAGES from "../../data/pages";
import { IPage } from "../../types";

export default function Pages() {
  const [pages, setPages] = useState<IPage[]>(PAGES);
  const [term, setTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState<IPage | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSavePages = (id: number) => (title: string) => {
    setPages((prevPages) => {
      return prevPages.map((page) => {
        return page.id === id ? { ...page, title } : page;
      });
    });
    setCurrentPage(null);
    setIsOpen(false);
  };

  const handleEditClick = (page: IPage) => {
    setIsOpen(true);
    setCurrentPage(page);
  };

  const getSearchPages = (term: string, pages: IPage[]) => {
    if (!term) return pages;
    return pages.filter((item) =>
      item.title.toUpperCase().includes(term.toUpperCase())
    );
  };

  const onSearch = (term: string) => {
    setTerm(term);
  };

  const getFilterData = (filterValue: string, items: IPage[]) => {
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

  const initValue = currentPage !== null ? currentPage.title : "";
  const id = currentPage !== null ? currentPage.id : 0;

  const filterPages = getFilterData(filterValue, pages);
  const visiblePages = getSearchPages(term, filterPages);

  return (
    <div>
      <h2>Pages</h2>
      <TableFilter onSearch={onSearch} onFilter={onFilter} />
      <Table items={visiblePages} onEdit={handleEditClick} />
      <Modal isOpen={isOpen} onClose={setIsOpen} title="Edit">
        <EditForm initValue={initValue} labelText={"Title"} onSave={handleSavePages(id)} />
      </Modal>
    </div>
  );
}
