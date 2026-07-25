"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontalIcon,
  FileTextIcon,
  EyeIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
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

interface BlogRow {
  id: string
  title: string
  author: string
  category: string
  status: string
  date: string
  views: number
  [key: string]: unknown
}

const demoPosts: BlogRow[] = [
  { id: "1", title: "How to Choose the Right Engine Oil for Your Vehicle", author: "Admin", category: "Maintenance", status: "published", date: "2026-07-15", views: 1245 },
  { id: "2", title: "Top 10 Brake Maintenance Tips", author: "Admin", category: "Safety", status: "published", date: "2026-07-10", views: 892 },
  { id: "3", title: "Understanding Your Vehicle's Warning Lights", author: "Staff", category: "Diagnostics", status: "draft", date: "2026-07-08", views: 0 },
  { id: "4", title: "Winter Car Care Guide", author: "Admin", category: "Seasonal", status: "published", date: "2026-06-20", views: 2100 },
  { id: "5", title: "Benefits of Regular Wheel Alignment", author: "Staff", category: "Safety", status: "published", date: "2026-06-15", views: 675 },
  { id: "6", title: "How Often Should You Change Your Oil?", author: "Admin", category: "Maintenance", status: "draft", date: "2026-06-10", views: 0 },
  { id: "7", title: "Signs Your Brakes Need Replacement", author: "Staff", category: "Safety", status: "published", date: "2026-05-25", views: 1580 },
]

const statusColors: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
}

export default function AdminBlogPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: ColumnDef<BlogRow>[] = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      sortable: true,
      accessorFn: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileTextIcon className="size-4 text-muted-foreground" />
          </div>
          <span className="font-medium">{row.title}</span>
        </div>
      ),
    },
    { id: "author", header: "Author", accessorKey: "author", sortable: true },
    { id: "category", header: "Category", accessorKey: "category", sortable: true },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant="secondary" className={`text-[10px] ${statusColors[row.status] || ""}`}>
          {row.status}
        </Badge>
      ),
    },
    { id: "date", header: "Date", accessorKey: "date", sortable: true, accessorFn: (row) => formatDate(row.date) },
    { id: "views", header: "Views", accessorKey: "views", sortable: true },
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
            <DropdownMenuItem>
              <Link href={`/admin/blog/${row.id}/edit`} className="flex items-center gap-2">
                <PencilIcon className="size-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeIcon className="size-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              {row.status === "published" ? <ToggleLeftIcon className="size-4" /> : <ToggleRightIcon className="size-4" />}
              {row.status === "published" ? "Unpublish" : "Publish"}
            </DropdownMenuItem>
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
      <PageHeader
        title="Blog"
        description="Manage blog posts and articles"
        actions={
          <Button>
            <PlusIcon className="size-4" />
            New Post
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={demoPosts} searchPlaceholder="Search posts..." emptyTitle="No posts found" emptyIcon={FileTextIcon} />
        </CardContent>
      </Card>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Post" description="Are you sure you want to delete this blog post?" confirmLabel="Delete" destructive onConfirm={() => setDeleteId(null)} />
    </div>
  )
}
