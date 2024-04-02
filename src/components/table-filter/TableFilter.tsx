import { useState } from "react";
import "./style.css";

interface TableFilterProps {
  onSearch: (term : string) => void
  onFilter: (term : string) => void
}

export default function TableFilter({onSearch, onFilter}: TableFilterProps) {
  const [term, setTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <form className="table-filter" onSubmit={(e)=>e.preventDefault()} >
      <div className="table-filter__group">
        <label htmlFor="search">Search</label>
        <input id="search" name="search" type="text" value={term} onChange={handleChange} />
      </div>
      <div className="table-filter__group">
        <label htmlFor="active">Active</label>
        <select name="active" id="active" onChange={handleFilter}>
          <option value={''}></option>
          <option value={'active'}>Active</option>
          <option value={'not active'}>Not Active</option>
        </select>
      </div>
    </form>
  );
}
