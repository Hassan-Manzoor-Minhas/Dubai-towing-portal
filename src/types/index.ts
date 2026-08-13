export type DriverStatus = "Active" | "Offline" | "Pending" | "Suspended";
export type JobStatus = "Completed" | "Pending" | "Cancelled" | "In Progress";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  dob: string;
  nationality: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  emiratesId: string;
  emiratesExpiry: string;
  licenceNumber: string;
  licenceCategory: string;
  licenceExpiry: string;
  employeeId: string;
  joiningDate: string;
  truckId: string;
  status: DriverStatus;
  jobsToday: number;
  revenueToday: number;
  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  totalFare: number;
  averageFare: number;
  lastActivity: string;
}

export interface Job {
  id: string;
  date: string;
  dateISO: string;
  driverId: string;
  customer: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  plate: string;
  vehicleType: string;
  issue: string;
  description: string;
  pickup: string;
  dropoff: string;
  startTime: string;
  endTime: string;
  towingType: string;
  truckId: string;
  fare: number;
  paymentMethod: string;
  paymentStatus: string;
  status: JobStatus;
}

export interface Truck {
  id: string;
  type: string;
  plate: string;
  driverId: string;
  status: "Active" | "Available" | "Maintenance" | "Inactive";
}

export type ApplicationStatus = "Submitted" | "Under Review" | "Approved" | "Rejected";

export interface DriverApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationality: string;
  emiratesId: string;
  licenceNumber: string;
  licenceCategory: string;
  appliedOn: string;
  status: ApplicationStatus;
}

export type AlertLevel = "warning" | "danger" | "info";

export interface Alert {
  id: string;
  level: AlertLevel;
  title: string;
  description: string;
}

export interface RevenuePoint {
  day: string;
  jobs: number;
  revenue: number;
}