
export enum UserRole {
  ADMIN = 'Admin',
  MAKER = 'Maker',
  WORKER = 'Worker',
  DISTRIBUTOR = 'Distributor',
  CUSTOMER = 'Customer'
}

export interface Design {
  id: string;
  name: string;
  imageUrl: string;
  creatorId: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  revenueGenerated: number;
}

export interface Recipe {
  id: string;
  designId: string;
  materials: string[];
  steps: string[];
  estimatedTime: string;
  measurements: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}
