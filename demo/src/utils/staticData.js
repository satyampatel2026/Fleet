export const stats = {
  companies: 48, employees: 312, drivers: 156, vehicles: 124,
  bookings: 67, trips: 284, fuelCost: '₹12.4L', maintenanceCost: '₹4.8L',
  utilization: 82, availability: 91,
};

export const companies = [
  { id: 1, name: 'Acme Logistics', code: 'ACM-001', city: 'Mumbai', fleet: 24, status: 'Active', contact: 'Rajesh Mehta', email: 'rajesh@acme.com', phone: '+91 98765 43210' },
  { id: 2, name: 'Swift Transport Co.', code: 'SWT-002', city: 'Delhi', fleet: 18, status: 'Active', contact: 'Priya Sharma', email: 'priya@swift.com', phone: '+91 87654 32109' },
  { id: 3, name: 'GreenFleet Solutions', code: 'GRN-003', city: 'Bangalore', fleet: 32, status: 'Active', contact: 'Arun Nair', email: 'arun@greenfleet.in', phone: '+91 76543 21098' },
  { id: 4, name: 'Metro Cargo Ltd', code: 'MTR-004', city: 'Chennai', fleet: 15, status: 'Inactive', contact: 'Kavitha R', email: 'kavitha@metro.com', phone: '+91 65432 10987' },
  { id: 5, name: 'NorthStar Fleet', code: 'NRS-005', city: 'Pune', fleet: 21, status: 'Active', contact: 'Vikram Singh', email: 'vikram@northstar.in', phone: '+91 54321 09876' },
];

export const employees = [
  { id: 1, name: 'Anita Desai', dept: 'Operations', designation: 'Fleet Manager', role: 'Manager', email: 'anita@fleet.com', status: 'Active' },
  { id: 2, name: 'Rohit Patel', dept: 'HR', designation: 'HR Executive', role: 'Staff', email: 'rohit@fleet.com', status: 'Active' },
  { id: 3, name: 'Sneha Iyer', dept: 'Finance', designation: 'Accountant', role: 'Staff', email: 'sneha@fleet.com', status: 'Active' },
  { id: 4, name: 'Mohammed Ali', dept: 'Operations', designation: 'Dispatch Lead', role: 'Supervisor', email: 'ali@fleet.com', status: 'On Leave' },
  { id: 5, name: 'Deepa Krishnan', dept: 'IT', designation: 'System Admin', role: 'Admin', email: 'deepa@fleet.com', status: 'Active' },
];

export const drivers = [
  { id: 1, name: 'Raj Kumar', license: 'MH-12-2019-0012345', expiry: '2027-03-15', medical: 'Valid', availability: 'Available', trips: 142, rating: 4.8 },
  { id: 2, name: 'Suresh Yadav', license: 'DL-01-2018-0098765', expiry: '2026-08-20', medical: 'Valid', availability: 'On Trip', trips: 198, rating: 4.6 },
  { id: 3, name: 'Imran Khan', license: 'KA-03-2020-0054321', expiry: '2028-01-10', medical: 'Expiring', availability: 'Available', trips: 87, rating: 4.9 },
  { id: 4, name: 'Manoj Tiwari', license: 'UP-14-2017-0032165', expiry: '2025-11-05', medical: 'Valid', availability: 'Off Duty', trips: 256, rating: 4.4 },
  { id: 5, name: 'Joseph Thomas', license: 'KL-07-2021-0078901', expiry: '2029-06-30', medical: 'Valid', availability: 'Available', trips: 63, rating: 4.7 },
];

export const vehicles = [
  { id: 1, number: 'MH-12-AB-1234', type: 'Truck', make: 'Tata', model: 'LPT 1613', fuel: 'Diesel', mileage: '8.2 km/l', status: 'Active', insurance: '2026-12-01', service: '2026-07-20' },
  { id: 2, number: 'DL-01-CD-5678', type: 'Van', make: 'Mahindra', model: 'Bolero Pickup', fuel: 'Diesel', mileage: '12.5 km/l', status: 'Active', insurance: '2026-09-15', service: '2026-08-05' },
  { id: 3, number: 'KA-03-EF-9012', type: 'SUV', make: 'Toyota', model: 'Innova Crysta', fuel: 'Diesel', mileage: '14.1 km/l', status: 'In Service', insurance: '2027-01-20', service: '2026-07-15' },
  { id: 4, number: 'TN-07-GH-3456', type: 'Truck', make: 'Ashok Leyland', model: 'Boss 1215', fuel: 'Diesel', mileage: '7.8 km/l', status: 'Active', insurance: '2026-06-30', service: '2026-09-10' },
  { id: 5, number: 'GJ-01-IJ-7890', type: 'Car', make: 'Hyundai', model: 'Creta', fuel: 'Petrol', mileage: '16.8 km/l', status: 'Idle', insurance: '2026-11-25', service: '2026-10-01' },
];

export const bookings = [
  { id: 'BK-2401', company: 'Acme Logistics', route: 'Mumbai → Pune', date: '2026-07-08', vehicle: 'MH-12-AB-1234', driver: 'Raj Kumar', status: 'Approved' },
  { id: 'BK-2402', company: 'Swift Transport', route: 'Delhi → Jaipur', date: '2026-07-09', vehicle: '—', driver: '—', status: 'Pending' },
  { id: 'BK-2403', company: 'GreenFleet', route: 'Bangalore → Hyderabad', date: '2026-07-07', vehicle: 'KA-03-EF-9012', driver: 'Imran Khan', status: 'Approved' },
  { id: 'BK-2404', company: 'Metro Cargo', route: 'Chennai → Coimbatore', date: '2026-07-06', vehicle: '—', driver: '—', status: 'Rejected' },
  { id: 'BK-2405', company: 'NorthStar Fleet', route: 'Pune → Goa', date: '2026-07-10', vehicle: 'DL-01-CD-5678', driver: 'Suresh Yadav', status: 'Pending' },
];

export const trips = [
  { id: 'TR-8821', booking: 'BK-2401', driver: 'Raj Kumar', vehicle: 'MH-12-AB-1234', route: 'Mumbai → Pune', start: '06:30 AM', end: '11:45 AM', distance: '148 km', status: 'Completed' },
  { id: 'TR-8822', booking: 'BK-2403', driver: 'Imran Khan', vehicle: 'KA-03-EF-9012', route: 'Bangalore → Hyderabad', start: '07:00 AM', end: '—', distance: '569 km', status: 'In Progress' },
  { id: 'TR-8823', booking: 'BK-2398', driver: 'Joseph Thomas', vehicle: 'GJ-01-IJ-7890', route: 'Ahmedabad → Surat', start: '05:45 AM', end: '09:20 AM', distance: '267 km', status: 'Completed' },
  { id: 'TR-8824', booking: 'BK-2395', driver: 'Manoj Tiwari', vehicle: 'TN-07-GH-3456', route: 'Chennai → Bangalore', start: '—', end: '—', distance: '346 km', status: 'Scheduled' },
  { id: 'TR-8825', booking: 'BK-2390', driver: 'Suresh Yadav', vehicle: 'DL-01-CD-5678', route: 'Delhi → Chandigarh', start: '08:00 AM', end: '—', distance: '—', status: 'Cancelled' },
];

export const fuelEntries = [
  { id: 1, vehicle: 'MH-12-AB-1234', date: '2026-07-05', liters: 85, cost: '₹7,650', station: 'Indian Oil, Panvel', mileage: '8.4 km/l' },
  { id: 2, vehicle: 'DL-01-CD-5678', date: '2026-07-04', liters: 42, cost: '₹3,780', station: 'HP, Gurgaon', mileage: '12.8 km/l' },
  { id: 3, vehicle: 'KA-03-EF-9012', date: '2026-07-03', liters: 55, cost: '₹4,950', station: 'Bharat Petroleum, Electronic City', mileage: '14.0 km/l' },
  { id: 4, vehicle: 'TN-07-GH-3456', date: '2026-07-02', liters: 120, cost: '₹10,800', station: 'Reliance, Sriperumbudur', mileage: '7.9 km/l' },
  { id: 5, vehicle: 'GJ-01-IJ-7890', date: '2026-07-01', liters: 35, cost: '₹3,185', station: 'Shell, Ahmedabad', mileage: '17.1 km/l' },
];

export const maintenanceRecords = [
  { id: 1, vehicle: 'MH-12-AB-1234', type: 'Scheduled Service', garage: 'Tata Motors Service, Navi Mumbai', date: '2026-07-20', cost: '₹18,500', status: 'Upcoming' },
  { id: 2, vehicle: 'KA-03-EF-9012', type: 'Engine Repair', garage: 'Toyota Service Center, Whitefield', date: '2026-07-15', cost: '₹42,000', status: 'In Progress' },
  { id: 3, vehicle: 'DL-01-CD-5678', type: 'Tyre Replacement', garage: 'MRF Tyres, Okhla', date: '2026-06-28', cost: '₹24,800', status: 'Completed' },
  { id: 4, vehicle: 'TN-07-GH-3456', type: 'Brake Inspection', garage: 'Ashok Leyland, Ambattur', date: '2026-08-10', cost: '₹6,200', status: 'Upcoming' },
  { id: 5, vehicle: 'GJ-01-IJ-7890', type: 'AC Service', garage: 'Hyundai Service, SG Highway', date: '2026-06-15', cost: '₹3,500', status: 'Completed' },
];

export const expenses = [
  { id: 1, category: 'Fuel', description: 'Monthly fuel — Acme fleet', amount: '₹2,45,000', date: '2026-07-01', type: 'Vehicle', status: 'Approved' },
  { id: 2, category: 'Toll', description: 'NH-48 toll charges', amount: '₹12,400', date: '2026-07-05', type: 'Trip', status: 'Approved' },
  { id: 3, category: 'Maintenance', description: 'Engine overhaul — KA-03-EF-9012', amount: '₹42,000', date: '2026-07-03', type: 'Vehicle', status: 'Pending' },
  { id: 4, category: 'Parking', description: 'Warehouse parking fees', amount: '₹8,600', date: '2026-06-30', type: 'Monthly', status: 'Approved' },
  { id: 5, category: 'Insurance', description: 'Fleet insurance renewal Q3', amount: '₹1,85,000', date: '2026-07-01', type: 'Monthly', status: 'Approved' },
];

export const documents = [
  { id: 1, name: 'Insurance Policy — MH-12-AB-1234', type: 'Insurance', entity: 'Vehicle', expiry: '2026-12-01', status: 'Valid' },
  { id: 2, name: 'Driving License — Raj Kumar', type: 'License', entity: 'Driver', expiry: '2027-03-15', status: 'Valid' },
  { id: 3, name: 'PUC Certificate — DL-01-CD-5678', type: 'PUC', entity: 'Vehicle', expiry: '2026-08-20', status: 'Expiring Soon' },
  { id: 4, name: 'Fitness Certificate — TN-07-GH-3456', type: 'Fitness', entity: 'Vehicle', expiry: '2026-07-10', status: 'Expired' },
  { id: 5, name: 'Medical Certificate — Imran Khan', type: 'Medical', entity: 'Driver', expiry: '2026-09-01', status: 'Valid' },
];

export const notifications = [
  { id: 1, title: 'Insurance expiring in 30 days', message: 'PUC for DL-01-CD-5678 expires on Aug 20, 2026', time: '2 hours ago', type: 'warning', read: false },
  { id: 2, title: 'Trip TR-8822 in progress', message: 'Imran Khan is en route Bangalore → Hyderabad', time: '4 hours ago', type: 'info', read: false },
  { id: 3, title: 'Maintenance completed', message: 'Tyre replacement for DL-01-CD-5678 finished', time: 'Yesterday', type: 'success', read: true },
  { id: 4, title: 'New booking request', message: 'Swift Transport requested Delhi → Jaipur route', time: 'Yesterday', type: 'info', read: true },
  { id: 5, title: 'Driver license expiring', message: 'Manoj Tiwari license expires Nov 5, 2025', time: '2 days ago', type: 'danger', read: true },
];

export const chartMonthlyTrips = [
  { month: 'Jan', trips: 420, revenue: 840 }, { month: 'Feb', trips: 380, revenue: 760 },
  { month: 'Mar', trips: 510, revenue: 1020 }, { month: 'Apr', trips: 470, revenue: 940 },
  { month: 'May', trips: 530, revenue: 1060 }, { month: 'Jun', trips: 490, revenue: 980 },
  { month: 'Jul', trips: 284, revenue: 568 },
];

export const chartFleetStatus = [
  { label: 'Active', value: 89, color: 'bg-emerald-500' },
  { label: 'In Service', value: 18, color: 'bg-amber-500' },
  { label: 'Idle', value: 12, color: 'bg-slate-400' },
  { label: 'Inactive', value: 5, color: 'bg-rose-500' },
];