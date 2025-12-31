import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface Action<T> {
  label: string;
  icon?: LucideIcon;
  onClick: (item: T) => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: (item: T) => boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  loading?: boolean;
  title?: string;
  description?: string;
  emptyState?: {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
}

/**
 * Generic data table component for admin interfaces
 * Supports sorting, actions, loading states, and custom rendering
 */
export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions = [],
  loading = false,
  title,
  description,
  emptyState,
  onSort,
  sortKey,
  sortDirection,
}: DataTableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (!onSort) return;

    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDirection);
  };

  const getActionVariantStyles = (variant: Action<T>["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] text-white hover:from-[#0094D9] hover:to-[#7300D9]";
      case "danger":
        return "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900";
      case "secondary":
      default:
        return "border border-blue-500/30 bg-gradient-to-r from-[#23243A]/50 to-[#181A20]/50 text-gray-300 hover:border-blue-500/50";
    }
  };

  if (loading) {
    return (
      <Card className="group relative border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-center py-12">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-blue-400"></div>
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-400/20"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <Card className="group relative border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="py-12 text-center">
            <div className="relative mx-auto mb-6 w-fit">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
              <div className="relative rounded-full bg-linear-to-r from-[#23243A] to-[#181A20] p-6">
                <emptyState.icon className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {emptyState.title}
            </h3>
            <p className="mb-4 text-gray-400">{emptyState.description}</p>
            {emptyState.action && (
              <Button
                onClick={emptyState.action.onClick}
                className="group relative bg-linear-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] hover:shadow-blue-500/40">
                <span className="relative">{emptyState.action.label}</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-white">{title}</CardTitle>}
          {description && <p className="text-gray-400">{description}</p>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/20">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase ${
                      column.sortable
                        ? "cursor-pointer hover:text-blue-400"
                        : ""
                    }`}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}>
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && sortKey === column.key && (
                        <span className="text-blue-400">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-500/20">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="transition-colors hover:bg-blue-500/5">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm whitespace-nowrap text-gray-300">
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || "")}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            disabled={action.disabled?.(item)}
                            size="sm"
                            className={`${getActionVariantStyles(
                              action.variant
                            )} transition-all duration-200`}>
                            {action.icon && (
                              <action.icon className="mr-1 h-4 w-4" />
                            )}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
