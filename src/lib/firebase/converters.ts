import type { FirestoreDataConverter } from 'firebase/firestore';
import type {
  User,
  Vehicle,
  Product,
  Category,
  Brand,
  Order,
  Service,
  Booking,
  Review,
  Supplier,
  Promotion,
  Coupon,
  BlogPost,
  FAQ,
} from '@/types';

function toFirestore<T>(data: T): Record<string, unknown> {
  const result = { ...data } as Record<string, unknown>;
  const dates = result as Record<string, unknown>;
  for (const key of Object.keys(dates)) {
    if (dates[key] instanceof Date) {
      result[key] = dates[key].toISOString();
    }
  }
  return result;
}

function fromFirestore<T>(
  data: Record<string, unknown>
): T {
  const result = { ...data } as Record<string, unknown>;
  for (const [key, value] of Object.entries(result)) {
    if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
      result[key] = (value as { toDate: () => Date }).toDate();
    }
  }
  return result as T;
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => {
    const { uid: _uid, ...rest } = user;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<User>({ uid: snapshot.id, ...data });
  },
};

export const vehicleConverter: FirestoreDataConverter<Vehicle> = {
  toFirestore: (vehicle: Vehicle) => {
    const { id: _id, ...rest } = vehicle;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Vehicle>({ id: snapshot.id, ...data });
  },
};

export const productConverter: FirestoreDataConverter<Product> = {
  toFirestore: (product: Product) => {
    const { id: _id, ...rest } = product;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Product>({ id: snapshot.id, ...data });
  },
};

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category) => {
    const { id: _id, ...rest } = category;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Category>({ id: snapshot.id, ...data });
  },
};

export const brandConverter: FirestoreDataConverter<Brand> = {
  toFirestore: (brand: Brand) => {
    const { id: _id, ...rest } = brand;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Brand>({ id: snapshot.id, ...data });
  },
};

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore: (order: Order) => {
    const { id: _id, ...rest } = order;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Order>({ id: snapshot.id, ...data });
  },
};

export const serviceConverter: FirestoreDataConverter<Service> = {
  toFirestore: (service: Service) => {
    const { id: _id, ...rest } = service;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Service>({ id: snapshot.id, ...data });
  },
};

export const bookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore: (booking: Booking) => {
    const { id: _id, ...rest } = booking;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Booking>({ id: snapshot.id, ...data });
  },
};

export const reviewConverter: FirestoreDataConverter<Review> = {
  toFirestore: (review: Review) => {
    const { id: _id, ...rest } = review;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Review>({ id: snapshot.id, ...data });
  },
};

export const supplierConverter: FirestoreDataConverter<Supplier> = {
  toFirestore: (supplier: Supplier) => {
    const { id: _id, ...rest } = supplier;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Supplier>({ id: snapshot.id, ...data });
  },
};

export const promotionConverter: FirestoreDataConverter<Promotion> = {
  toFirestore: (promotion: Promotion) => {
    const { id: _id, ...rest } = promotion;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Promotion>({ id: snapshot.id, ...data });
  },
};

export const couponConverter: FirestoreDataConverter<Coupon> = {
  toFirestore: (coupon: Coupon) => {
    const { id: _id, ...rest } = coupon;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<Coupon>({ id: snapshot.id, ...data });
  },
};

export const blogPostConverter: FirestoreDataConverter<BlogPost> = {
  toFirestore: (post: BlogPost) => {
    const { id: _id, ...rest } = post;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<BlogPost>({ id: snapshot.id, ...data });
  },
};

export const faqConverter: FirestoreDataConverter<FAQ> = {
  toFirestore: (faq: FAQ) => {
    const { id: _id, ...rest } = faq;
    return toFirestore(rest);
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return fromFirestore<FAQ>({ id: snapshot.id, ...data });
  },
};
