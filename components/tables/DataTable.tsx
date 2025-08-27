import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface DataTableProps<T> {
  columns: { header: string; accessor: keyof T }[];
  data: T[];
  filters?: FilterConfig[];
  searchTerm?: string;
  onSearchTermChange?: (term: string) => void;
}

function DataTable<T extends { [key: string]: any }>({ 
  columns, 
  data, 
  filters = [],
  searchTerm,
  onSearchTermChange
}: DataTableProps<T>): React.ReactNode {
  return (
    <div className="w-full">
        <div className="flex items-center flex-wrap py-4 gap-2">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext" />
                <input 
                  placeholder="Filter students..." 
                  className="w-full rounded-md bg-muted py-2 pl-10 pr-4 text-sm" 
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange?.(e.target.value)}
                />
            </div>
            {filters.map((filter) => (
              <div key={filter.id} className="relative">
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-48 appearance-none rounded-md bg-muted py-2 pl-3 pr-8 text-sm font-medium text-subtext focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={filter.label}
                >
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext pointer-events-none" />
              </div>
            ))}
        </div>
        <div className="rounded-md border border-muted">
        <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b [&_tr]:border-muted">
            <tr className="transition-colors hover:bg-muted/50">
                {columns.map((col, index) => (
                <th key={index} className="h-12 px-4 text-left align-middle font-medium text-subtext">
                    {col.header}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-muted transition-colors hover:bg-muted/50">
                {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-4 align-middle">
                        {row[col.accessor]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default DataTable;