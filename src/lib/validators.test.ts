import { describe, it, expect } from "vitest"
import {
  validateLogin,
  validateRegister,
  validateProduct,
  validateBooking,
  validateProfile,
} from "./validators"

describe("validateLogin", () => {
  it("accepts valid login data", () => {
    const result = validateLogin({
      email: "test@example.com",
      password: "password123",
    })
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })

  it("rejects invalid email", () => {
    const result = validateLogin({
      email: "notanemail",
      password: "password123",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.email).toBeDefined()
  })

  it("rejects short password", () => {
    const result = validateLogin({
      email: "test@example.com",
      password: "1234567",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.password).toBeDefined()
  })

  it("rejects empty fields", () => {
    const result = validateLogin({})
    expect(result.success).toBe(false)
  })

  it("rejects missing email", () => {
    const result = validateLogin({ password: "password123" })
    expect(result.success).toBe(false)
    expect(result.errors?.email).toBeDefined()
  })

  it("rejects missing password", () => {
    const result = validateLogin({ email: "test@example.com" })
    expect(result.success).toBe(false)
    expect(result.errors?.password).toBeDefined()
  })
})

describe("validateRegister", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    confirmPassword: "password123",
  }

  it("accepts valid registration data", () => {
    const result = validateRegister(validData)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })

  it("rejects password mismatch", () => {
    const result = validateRegister({
      ...validData,
      confirmPassword: "differentpassword",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.confirmPassword).toBeDefined()
  })

  it("rejects short password", () => {
    const result = validateRegister({
      ...validData,
      password: "1234567",
      confirmPassword: "1234567",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.password).toBeDefined()
  })

  it("rejects invalid email", () => {
    const result = validateRegister({
      ...validData,
      email: "notanemail",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.email).toBeDefined()
  })

  it("rejects short name", () => {
    const result = validateRegister({
      ...validData,
      name: "J",
    })
    expect(result.success).toBe(false)
    expect(result.errors?.name).toBeDefined()
  })

  it("accepts optional phone", () => {
    const result = validateRegister({
      ...validData,
      phone: "+27123456789",
    })
    expect(result.success).toBe(true)
  })
})

describe("validateProduct", () => {
  const validProduct = {
    name: "Brake Pads",
    description: "High quality brake pads",
    sku: "BRK-001",
    brand: "Bosch",
    category: "Brakes",
    price: 450,
    stock: 25,
    images: ["https://example.com/image.jpg"],
  }

  it("accepts valid product data", () => {
    const result = validateProduct(validProduct)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })

  it("rejects missing name", () => {
    const result = validateProduct({ ...validProduct, name: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.name).toBeDefined()
  })

  it("rejects missing description", () => {
    const result = validateProduct({ ...validProduct, description: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.description).toBeDefined()
  })

  it("rejects missing sku", () => {
    const result = validateProduct({ ...validProduct, sku: "" })
    expect(result.success).toBe(false)
  })

  it("rejects negative price", () => {
    const result = validateProduct({ ...validProduct, price: -10 })
    expect(result.success).toBe(false)
    expect(result.errors?.price).toBeDefined()
  })

  it("rejects negative stock", () => {
    const result = validateProduct({ ...validProduct, stock: -5 })
    expect(result.success).toBe(false)
  })

  it("rejects empty images array", () => {
    const result = validateProduct({ ...validProduct, images: [] })
    expect(result.success).toBe(false)
    expect(result.errors?.images).toBeDefined()
  })

  it("accepts optional salePrice", () => {
    const result = validateProduct({
      ...validProduct,
      salePrice: 350,
    })
    expect(result.success).toBe(true)
  })
})

describe("validateBooking", () => {
  const validBooking = {
    serviceId: "service-123",
    date: "2025-01-15",
    timeSlot: "09:00",
    vehicleId: "vehicle-123",
  }

  it("accepts valid booking data", () => {
    const result = validateBooking(validBooking)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })

  it("rejects missing serviceId", () => {
    const result = validateBooking({ ...validBooking, serviceId: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.serviceId).toBeDefined()
  })

  it("rejects missing date", () => {
    const result = validateBooking({ ...validBooking, date: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.date).toBeDefined()
  })

  it("rejects missing timeSlot", () => {
    const result = validateBooking({ ...validBooking, timeSlot: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.timeSlot).toBeDefined()
  })

  it("rejects missing vehicleId", () => {
    const result = validateBooking({ ...validBooking, vehicleId: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.vehicleId).toBeDefined()
  })

  it("accepts optional notes", () => {
    const result = validateBooking({
      ...validBooking,
      notes: "Please check brakes",
    })
    expect(result.success).toBe(true)
  })
})

describe("validateProfile", () => {
  const validProfile = {
    name: "John Doe",
    email: "john@example.com",
  }

  it("accepts valid profile data", () => {
    const result = validateProfile(validProfile)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })

  it("rejects missing name", () => {
    const result = validateProfile({ ...validProfile, name: "" })
    expect(result.success).toBe(false)
    expect(result.errors?.name).toBeDefined()
  })

  it("rejects short name", () => {
    const result = validateProfile({ ...validProfile, name: "J" })
    expect(result.success).toBe(false)
    expect(result.errors?.name).toBeDefined()
  })

  it("rejects invalid email", () => {
    const result = validateProfile({ ...validProfile, email: "invalid" })
    expect(result.success).toBe(false)
    expect(result.errors?.email).toBeDefined()
  })

  it("accepts optional phone", () => {
    const result = validateProfile({
      ...validProfile,
      phone: "+27123456789",
    })
    expect(result.success).toBe(true)
  })

  it("accepts empty phone", () => {
    const result = validateProfile({
      ...validProfile,
      phone: undefined,
    })
    expect(result.success).toBe(true)
  })
})
