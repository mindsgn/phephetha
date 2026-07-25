import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z.email(),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
})

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
})

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .int()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  color: z.string().min(1, "Color is required"),
  licensePlate: z.string().min(1, "License plate is required"),
  vin: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required"),
  sku: z.string().min(1, "SKU is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  salePrice: z.number().min(0).optional(),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  compatibleVehicles: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
})

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
})

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required"),
  logo: z.string().optional(),
  description: z.string().optional(),
})

export const orderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ]),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  vehicleId: z.string().min(1, "Vehicle is required"),
  notes: z.string().optional(),
  images: z.array(z.string()).default([]),
})

export const serviceSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  duration: z.number().int().min(15, "Duration must be at least 15 minutes"),
  images: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().min(1, "Comment is required").max(2000),
  productId: z.string().optional(),
})

export const couponSchema = z.object({
  code: z.string().min(1, "Code is required").max(20),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  minPurchase: z.number().min(0).optional(),
  maxUses: z.number().int().min(1).optional(),
  expiry: z.string().optional(),
})

export const promotionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  productIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email(),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
})

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required").max(500),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
  order: z.number().int().min(0),
})

export const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required").max(100),
  siteDescription: z.string().min(1, "Site description is required").max(500),
  logo: z.string().optional(),
  contactInfo: z.object({
    email: z.email(),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
  }),
  businessHours: z.record(
    z.string(),
    z.object({
      open: z.string(),
      close: z.string(),
      closed: z.boolean().optional(),
    }),
  ),
})

export const inventoryAdjustmentSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  type: z.enum(["in", "out", "adjust"]),
  reason: z.string().min(1, "Reason is required"),
})

export const supplierSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.email(),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
})

export const purchaseOrderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
})

export const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  items: z.array(purchaseOrderItemSchema).min(1, "At least one item is required"),
  expectedDate: z.string().min(1, "Expected date is required"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type VehicleInput = z.infer<typeof vehicleSchema>
export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type BrandInput = z.infer<typeof brandSchema>
export type OrderStatusInput = z.infer<typeof orderStatusSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CouponInput = z.infer<typeof couponSchema>
export type PromotionInput = z.infer<typeof promotionSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type BlogPostInput = z.infer<typeof blogPostSchema>
export type FAQInput = z.infer<typeof faqSchema>
export type SettingsInput = z.infer<typeof settingsSchema>
export type InventoryAdjustmentInput = z.infer<typeof inventoryAdjustmentSchema>
export type SupplierInput = z.infer<typeof supplierSchema>
export type PurchaseOrderInput = z.infer<typeof purchaseOrderSchema>

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email(),
  phone: z.string().min(1, "Phone number is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  saveAddress: z.boolean().optional(),
  deliveryMethod: z.enum(["standard", "express"]),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
