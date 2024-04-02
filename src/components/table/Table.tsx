import { ReactNode } from "react";
import "./style.css";

type TableProps<T> = {
  items: T[];
  onEdit: (item: T) => void;
};

export default function Table<T extends Record<string, unknown>>({
  items,
  onEdit,
}: TableProps<T>) {
  const itemKeys = items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <table>
      <thead>
        <tr>
          {itemKeys.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {itemKeys.map((key, keyIndex) => {
              const value = item[key];
              let displayValue: ReactNode;

              if (typeof value === 'boolean') {
                displayValue = value ? 'Active' : 'Not Active';
              } else if (typeof value === 'object' && value !== null) {
                displayValue = Object.values(value).join(', ');
              } else if (typeof value === 'string' || typeof value === 'number') {
                displayValue = value;
              }

              return <td key={keyIndex}>{displayValue}</td>;
            })}
            <td>
              <button className="btn" onClick={() => onEdit(item)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}