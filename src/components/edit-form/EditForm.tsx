import { useState } from "react";

interface EditFormProps {
  initValue: string;
  labelText: string;
  onSave: (text: string) => void;
}

export default function EditForm({ initValue, labelText, onSave }: EditFormProps) {
  const [value, setValue] = useState(initValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSave(value);
  };

  return (
    <form className="modal__form">
      <div className="table-filter__group">
        <label htmlFor={labelText}>{labelText}</label>
        <input
          id={labelText}
          name={labelText}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleClick}>
        Save
      </button>
    </form>
  );
}
