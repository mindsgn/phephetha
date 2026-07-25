"use client"

import { useState, useMemo } from "react"
import {
  StarIcon,
  MoreHorizontalIcon,
  CheckCircleIcon,
  XCircleIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatDate } from "@/lib/utils"

interface ReviewRow {
  id: string
  customer: string
  product: string
  rating: number
  date: string
  status: string
  comment: string
  [key: string]: unknown
}

const demoReviews: ReviewRow[] = [
  { id: "1", customer: "John Mokoena", product: "Synthetic Engine Oil 5W-30", rating: 5, date: "2026-07-17", status: "published", comment: "Excellent oil! Engine runs smoother and fuel economy improved." },
  { id: "2", customer: "Sarah Ndlovu", product: "Brake Pad Set - Front", rating: 4, date: "2026-07-16", status: "published", comment: "Great brake pads. Good stopping power and low noise." },
  { id: "3", customer: "David Pretorius", product: "Performance Air Filter", rating: 5, date: "2026-07-15", status: "published", comment: "Noticeable improvement in throttle response. Highly recommend!" },
  { id: "4", customer: "Thabo Molefe", product: "Full Service", rating: 3, date: "2026-07-14", status: "pending", comment: "Service was okay. Took a bit longer than expected." },
  { id: "5", customer: "Lisa van der Berg", product: "LED Headlight Bulbs", rating: 5, date: "2026-07-13", status: "published", comment: "These bulbs are incredible. Night driving is so much better." },
  { id: "6", customer: "James Nkosi", product: "Wheel Alignment", rating: 2, date: "2026-07-12", status: "rejected", comment: "Vehicle still pulls to the left after alignment." },
  { id: "7", customer: "Mary Dlamini", product: "Oil Change", rating: 4, date: "2026-07-11", status: "pending", comment: "Quick and professional service. Will return." },
  { id: "8", customer: "Peter Smit", product: "Clutch Kit Complete", rating: 5, date: "2026-07-10", status: "published", comment: "Perfect fit and smooth engagement. Quality product." },
  { id: "9", customer: "Grace Khumalo", product: "Brake Service", rating: 4, date: "2026-07-09", status: "published", comment: "Good service, reasonable price. Brakes feel great now." },
  { id: "10", customer: "Sipho Zulu", product: "Engine Diagnostic", rating: 1, date: "2026-07-08", status: "pending", comment: "Still having issues after the diagnostic. Not satisfied." },
]

const statusColors: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  )
}

export default function AdminReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState(0)
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredReviews = useMemo(() => {
    return demoReviews.filter((r) => {
      if (ratingFilter > 0 && r.rating !== ratingFilter) return false
      if (statusFilter !== "all" && r.status !== statusFilter) return false
      return true
    })
  }, [ratingFilter, statusFilter])

  const columns: ColumnDef<ReviewRow>[] = [
    { id: "customer", header: "Customer", accessorKey: "customer", sortable: true },
    { id: "product", header: "Product/Service", accessorKey: "product", sortable: true },
    {
      id: "rating",
      header: "Rating",
      accessorKey: "rating",
      sortable: true,
      accessorFn: (row) => <Stars count={row.rating} />,
    },
    { id: "date", header: "Date", accessorKey: "date", sortable: true, accessorFn: (row) => formatDate(row.date) },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant="secondary" className={`text-[10px] ${statusColors[row.status] || ""}`}>
          {row.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      accessorFn: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <MoreHorizontalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {row.status !== "published" && (
              <DropdownMenuItem>
                <CheckCircleIcon className="size-4" />
                Approve
              </DropdownMenuItem>
            )}
            {row.status !== "rejected" && (
              <DropdownMenuItem>
                <XCircleIcon className="size-4" />
                Reject
              </DropdownMenuItem>
            )}
            <DropdownMenuItem variant="destructive" onClick={() => setDeleteId(row.id)}>
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Reviews" description="Manage customer reviews and ratings" />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex gap-1">
              <Button variant={ratingFilter === 0 ? "default" : "outline"} size="sm" onClick={() => setRatingFilter(0)}>All</Button>
              {[5, 4, 3, 2, 1].map((r) => (
                <Button key={r} variant={ratingFilter === r ? "default" : "outline"} size="sm" onClick={() => setRatingFilter(r)} className="gap-1">
                  {r}<StarIcon className="size-3 fill-current" />
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {["all", "published", "pending", "rejected"].map((s) => (
                <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)} className="capitalize">
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <DataTable columns={columns} data={filteredReviews} searchPlaceholder="Search reviews..." emptyTitle="No reviews found" emptyIcon={StarIcon} />
        </CardContent>
      </Card>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Review" description="Are you sure you want to delete this review?" confirmLabel="Delete" destructive onConfirm={() => { setDeleteId(null) }} />
    </div>
  )
}
