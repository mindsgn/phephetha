export type UserRole = "customer" | "admin" | "staff"

export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  role: UserRole
  customClaims?: Record<string, unknown>
  createdAt: string
  updatedAt: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface Vehicle {
  id: string
  userId: string
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
  vin?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  brand: string
  category: string
  price: number
  salePrice?: number
  stock: number
  images: string[]
  compatibleVehicles: string[]
  specifications: Record<string, string>
  rating?: number
  reviewCount?: number
  featured?: boolean
  active?: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount?: number
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  productCount?: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  couponCode?: string
  discount?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  images: string[]
  benefits: string[]
  category?: string
  active?: boolean
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  bookingNumber: string
  userId: string
  serviceId: string
  service?: Service
  date: string
  timeSlot: string
  vehicleId: string
  vehicle?: Vehicle
  notes?: string
  images?: string[]
  status: BookingStatus
  createdAt: string
  updatedAt: string
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"

export interface Review {
  id: string
  userId: string
  userName: string
  productId?: string
  serviceId?: string
  rating: number
  comment: string
  images?: string[]
  helpful?: number
  createdAt: string
  updatedAt: string
}

export interface Coupon {
  id: string
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minPurchase?: number
  maxUses?: number
  usedCount?: number
  expiry?: string
  active?: boolean
  createdAt: string
  updatedAt: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  startDate: string
  endDate: string
  productIds?: string[]
  categoryIds?: string[]
  active?: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image?: string
  tags: string[]
  published: boolean
  authorId: string
  authorName: string
  createdAt: string
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface SiteSettings {
  id: string
  siteName: string
  siteDescription: string
  logo?: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  businessHours: Record<string, { open: string; close: string; closed?: boolean }>
  socialLinks?: Record<string, string>
  updatedAt: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  contactPerson: string
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrder {
  id: string
  supplierId: string
  supplier?: Supplier
  items: PurchaseOrderItem[]
  expectedDate: string
  status: "pending" | "ordered" | "received" | "cancelled"
  total: number
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrderItem {
  productId: string
  product?: Product
  quantity: number
  unitPrice: number
}

export interface InventoryAdjustment {
  id: string
  productId: string
  product?: Product
  quantity: number
  type: "in" | "out" | "adjust"
  reason: string
  adjustedBy: string
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read?: boolean
  createdAt: string
}
