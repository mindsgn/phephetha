import { type ZodError } from "zod"
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  profileSchema,
  vehicleSchema,
  productSchema,
  categorySchema,
  brandSchema,
  orderStatusSchema,
  bookingSchema,
  serviceSchema,
  reviewSchema,
  couponSchema,
  promotionSchema,
  contactSchema,
  blogPostSchema,
  faqSchema,
  settingsSchema,
  inventoryAdjustmentSchema,
  supplierSchema,
  purchaseOrderSchema,
} from "./validations"

type ValidationResult<T> = {
  success: boolean
  errors?: Record<string, string>
  data?: T
}

function formatErrors<T>(error: ZodError): ValidationResult<T> {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.join(".")
    if (!errors[path]) {
      errors[path] = issue.message
    }
  }
  return { success: false, errors }
}

export function validateLogin(data: unknown): ValidationResult<ReturnType<typeof loginSchema.parse>> {
  const result = loginSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateRegister(data: unknown): ValidationResult<ReturnType<typeof registerSchema.parse>> {
  const result = registerSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateForgotPassword(data: unknown): ValidationResult<ReturnType<typeof forgotPasswordSchema.parse>> {
  const result = forgotPasswordSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateResetPassword(data: unknown): ValidationResult<ReturnType<typeof resetPasswordSchema.parse>> {
  const result = resetPasswordSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateProfile(data: unknown): ValidationResult<ReturnType<typeof profileSchema.parse>> {
  const result = profileSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateVehicle(data: unknown): ValidationResult<ReturnType<typeof vehicleSchema.parse>> {
  const result = vehicleSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateProduct(data: unknown): ValidationResult<ReturnType<typeof productSchema.parse>> {
  const result = productSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateCategory(data: unknown): ValidationResult<ReturnType<typeof categorySchema.parse>> {
  const result = categorySchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateBrand(data: unknown): ValidationResult<ReturnType<typeof brandSchema.parse>> {
  const result = brandSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateOrderStatus(data: unknown): ValidationResult<ReturnType<typeof orderStatusSchema.parse>> {
  const result = orderStatusSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateBooking(data: unknown): ValidationResult<ReturnType<typeof bookingSchema.parse>> {
  const result = bookingSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateService(data: unknown): ValidationResult<ReturnType<typeof serviceSchema.parse>> {
  const result = serviceSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateReview(data: unknown): ValidationResult<ReturnType<typeof reviewSchema.parse>> {
  const result = reviewSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateCoupon(data: unknown): ValidationResult<ReturnType<typeof couponSchema.parse>> {
  const result = couponSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validatePromotion(data: unknown): ValidationResult<ReturnType<typeof promotionSchema.parse>> {
  const result = promotionSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateContact(data: unknown): ValidationResult<ReturnType<typeof contactSchema.parse>> {
  const result = contactSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateBlogPost(data: unknown): ValidationResult<ReturnType<typeof blogPostSchema.parse>> {
  const result = blogPostSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateFAQ(data: unknown): ValidationResult<ReturnType<typeof faqSchema.parse>> {
  const result = faqSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateSettings(data: unknown): ValidationResult<ReturnType<typeof settingsSchema.parse>> {
  const result = settingsSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateInventoryAdjustment(data: unknown): ValidationResult<ReturnType<typeof inventoryAdjustmentSchema.parse>> {
  const result = inventoryAdjustmentSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validateSupplier(data: unknown): ValidationResult<ReturnType<typeof supplierSchema.parse>> {
  const result = supplierSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}

export function validatePurchaseOrder(data: unknown): ValidationResult<ReturnType<typeof purchaseOrderSchema.parse>> {
  const result = purchaseOrderSchema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return formatErrors(result.error)
}
