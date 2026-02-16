
export enum UserRole {
  ADMIN = 'Admin',
  MAKER = 'Maker',
  WORKER = 'Worker',
  DISTRIBUTOR = 'Distributor',
  CUSTOMER = 'Customer'
}

export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  country: string;
  state: string;
  address: string;
  department: string;
  title: string;
  dob: string;
  gender: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  role: UserRole;
  stats: {
    ordersCount: number;
    wishlistCount: number;
    totalSpent: number;
    totalEarned?: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
  isApproved: boolean;
  creatorId: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: string;
}

export interface Recipe {
  id: string;
  name: string;
  designId?: string;
  materials: string[];
  steps: string[];
  estimatedTime: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'In Production' | 'Quality Check' | 'Completed';
  worker?: string;
  creatorId: string;
}
