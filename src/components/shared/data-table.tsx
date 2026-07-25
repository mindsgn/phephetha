"use client"

import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ColumnsIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { SearchInput } from "@/components/shared/search-input"
import { EmptyState } from "@/components/shared/empty-state"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { cn } from "@/lib/utils"

export interface ColumnDef<T> {
  id: string
  header: string
  accessorKey?: keyof T
  accessorFn?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
  hidden?: boolean
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  searchKey?: string
  searchPlaceholder?: string
  loading?: boolean
  pageSize?: number
  enableSelection?: boolean
  onRowClick?: (row: T) => void
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: React.ComponentType<{ className?: string }> | React.ComponentType
  toolbar?: React.ReactNode
}

export function DataTable<T extends Record<string, unknown>>({
  columns: initialColumns,
  data,
  searchKey,
  searchPlaceholder,
  loading = false,
  pageSize = 10,
  enableSelection = false,
  onRowClick,
  emptyTitle = "No results",
  emptyDescription = "No data to display.",
  emptyIcon,
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set())

  const columns = useMemo(
    () => initialColumns.filter((c) => !hiddenCols.has(c.id)),
    [initialColumns, hiddenCols]
  )

  const filteredData = useMemo(() => {
    if (!search || !searchKey) return data
    return data.filter((row) => {
      const val = row[searchKey]
      return String(val ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }, [data, search, searchKey])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const col = initialColumns.find((c) => c.id === sortKey)
      if (!col) return 0
      const aVal = col.accessorKey ? a[col.accessorKey] : ""
      const bVal = col.accessorKey ? b[col.accessorKey] : ""
      const cmp = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
        numeric: true,
      })
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filteredData, sortKey, sortDir, initialColumns])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(page * pageSize, (page + 1) * pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const toggleAll = () => {
    if (selected.size === paginatedData.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(paginatedData.map((_, i) => page * pageSize + i)))
    }
  }

  const toggleRow = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {searchKey && (
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v)
              setPage(0)
            }}
            placeholder={searchPlaceholder || "Search..."}
            className="w-72"
          />
        )}
        <div className="flex-1" />
        {toolbar}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" size="sm" className="gap-1.5" />}
          >
            <ColumnsIcon className="size-3.5" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {initialColumns.map((col) => (
              <DropdownMenuItem
                key={col.id}
                onClick={() => {
                  setHiddenCols((prev) => {
                    const next = new Set(prev)
                    if (next.has(col.id)) next.delete(col.id)
                    else next.add(col.id)
                    return next
                  })
                }}
              >
                <Checkbox checked={!hiddenCols.has(col.id)} />
                {col.header}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : paginatedData.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      selected.size === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    col.sortable && "cursor-pointer select-none",
                    col.className
                  )}
                  onClick={col.sortable ? () => handleSort(col.id) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable &&
                      (sortKey === col.id ? (
                        sortDir === "asc" ? (
                          <ChevronUpIcon className="size-3" />
                        ) : (
                          <ChevronDownIcon className="size-3" />
                        )
                      ) : (
                        <ChevronsUpDownIcon className="size-3 text-muted-foreground" />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, i) => {
              const globalIdx = page * pageSize + i
              return (
                <TableRow
                  key={globalIdx}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {enableSelection && (
                    <TableCell>
                      <Checkbox
                        checked={selected.has(globalIdx)}
                        onCheckedChange={() => toggleRow(globalIdx)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.id} className={col.className}>
                      {col.accessorFn
                        ? col.accessorFn(row)
                        : col.accessorKey
                          ? String(row[col.accessorKey] ?? "")
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {page * pageSize + 1}-
            {Math.min((page + 1) * pageSize, sortedData.length)} of{" "}
            {sortedData.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i
              } else if (page < 3) {
                pageNum = i
              } else if (page > totalPages - 4) {
                pageNum = totalPages - 5 + i
              } else {
                pageNum = page - 2 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum + 1}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
