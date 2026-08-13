import type { Alert, Driver, DriverApplication, Job, RevenuePoint, Truck } from "../types";

/* ---------- Business Admin login (MVP mock credentials) ---------- */
/* In a real backend these would be hashed & stored server-side. */
export const ADMIN_CREDENTIALS = { email: "admin@dubaitowing.ae", password: "Admin@123" };

export const drivers: Driver[] = [
  {
    id:"DT-001", name:"Ahmed Ali", phone:"+971 50 427 2289", email:"ahmed.ali@dubaitowing.ae", password:"Driver@123",
    dob:"15 May 1995", nationality:"Pakistani", address:"Al Qusais, Dubai, UAE",
    emergencyContact:"Muhammad Ali", emergencyPhone:"+971 50 111 2233",
    emiratesId:"784-1995-XXXXXXX-X", emiratesExpiry:"15 Dec 2027",
    licenceNumber:"DL-7842-001", licenceCategory:"Heavy Vehicle", licenceExpiry:"20 Mar 2028",
    employeeId:"DT-001", joiningDate:"10 Jan 2026", truckId:"T-05", status:"Active",
    jobsToday:4, revenueToday:850, totalJobs:47, completedJobs:44, cancelledJobs:3, totalFare:12450, averageFare:264.89,
    lastActivity:"12 min ago"
  },
  {
    id:"DT-002", name:"Mohammed Khan", phone:"+971 52 384 1102", email:"mohammed.k@dubaitowing.ae", password:"Driver@123",
    dob:"02 Aug 1992", nationality:"Pakistani", address:"Al Nahda, Dubai, UAE",
    emergencyContact:"Sajid Khan", emergencyPhone:"+971 52 212 8890",
    emiratesId:"784-1992-XXXXXXX-X", emiratesExpiry:"09 Sep 2027",
    licenceNumber:"DL-7842-002", licenceCategory:"Heavy Vehicle", licenceExpiry:"14 Jan 2028",
    employeeId:"DT-002", joiningDate:"18 Feb 2026", truckId:"T-02", status:"Active",
    jobsToday:3, revenueToday:620, totalJobs:39, completedJobs:38, cancelledJobs:1, totalFare:10120, averageFare:259.49,
    lastActivity:"31 min ago"
  },
  {
    id:"DT-003", name:"Khalid Hassan", phone:"+971 55 218 7704", email:"khalid.h@dubaitowing.ae", password:"Driver@123",
    dob:"22 Nov 1990", nationality:"Indian", address:"Muhaisnah, Dubai, UAE",
    emergencyContact:"Imran Hassan", emergencyPhone:"+971 55 887 1122",
    emiratesId:"784-1990-XXXXXXX-X", emiratesExpiry:"22 Apr 2027",
    licenceNumber:"DL-7842-003", licenceCategory:"Heavy Vehicle", licenceExpiry:"02 Feb 2027",
    employeeId:"DT-003", joiningDate:"02 Mar 2026", truckId:"T-08", status:"Offline",
    jobsToday:0, revenueToday:0, totalJobs:31, completedJobs:29, cancelledJobs:2, totalFare:7820, averageFare:252.26,
    lastActivity:"2 hr ago"
  },
  {
    id:"DT-004", name:"Usman Raza", phone:"+971 56 402 3319", email:"usman.r@dubaitowing.ae", password:"Driver@123",
    dob:"10 Jan 1996", nationality:"Pakistani", address:"International City, Dubai, UAE",
    emergencyContact:"Rashid Raza", emergencyPhone:"+971 56 339 9011",
    emiratesId:"784-1996-XXXXXXX-X", emiratesExpiry:"18 Aug 2028",
    licenceNumber:"DL-7842-004", licenceCategory:"Heavy Vehicle", licenceExpiry:"11 Jun 2028",
    employeeId:"DT-004", joiningDate:"12 Mar 2026", truckId:"T-03", status:"Active",
    jobsToday:5, revenueToday:1100, totalJobs:55, completedJobs:53, cancelledJobs:2, totalFare:14980, averageFare:272.36,
    lastActivity:"7 min ago"
  },
  {
    id:"DT-005", name:"Bilal Ahmed", phone:"+971 54 287 6150", email:"bilal.a@dubaitowing.ae", password:"Driver@123",
    dob:"28 Mar 1993", nationality:"Bangladeshi", address:"Al Warqa, Dubai, UAE",
    emergencyContact:"Noman Ahmed", emergencyPhone:"+971 54 772 2190",
    emiratesId:"784-1993-XXXXXXX-X", emiratesExpiry:"04 Jan 2027",
    licenceNumber:"DL-7842-005", licenceCategory:"Heavy Vehicle", licenceExpiry:"18 Oct 2027",
    employeeId:"DT-005", joiningDate:"24 Mar 2026", truckId:"T-06", status:"Pending",
    jobsToday:0, revenueToday:0, totalJobs:22, completedJobs:21, cancelledJobs:1, totalFare:5340, averageFare:242.73,
    lastActivity:"Yesterday"
  }
];

const curatedJobs: Job[] = [
  {id:"DT-1045", date:"13 Aug 2026", dateISO:"2026-08-13", driverId:"DT-001", customer:"Ahmed Khan", phone:"+971 50 000 1201", vehicleMake:"Toyota", vehicleModel:"Camry", plate:"Dubai A 12345", vehicleType:"Sedan", issue:"Engine Problem", description:"Vehicle stopped and could not restart.", pickup:"Al Barsha, Dubai", dropoff:"Al Quoz, Dubai", startTime:"10:25 AM", endTime:"11:15 AM", towingType:"Flatbed", truckId:"T-05", fare:300, paymentMethod:"Cash", paymentStatus:"Paid", status:"Completed"},
  {id:"DT-1046", date:"13 Aug 2026", dateISO:"2026-08-13", driverId:"DT-001", customer:"Ali Raza", phone:"+971 52 000 3311", vehicleMake:"Nissan", vehicleModel:"Patrol", plate:"Dubai B 67210", vehicleType:"SUV", issue:"Flat Tyre", description:"Front tyre puncture; vehicle not safe to drive.", pickup:"Jumeirah, Dubai", dropoff:"Deira, Dubai", startTime:"12:10 PM", endTime:"1:00 PM", towingType:"Flatbed", truckId:"T-05", fare:250, paymentMethod:"Card", paymentStatus:"Paid", status:"Completed"},
  {id:"DT-1040", date:"12 Aug 2026", dateISO:"2026-08-12", driverId:"DT-001", customer:"Omar Hassan", phone:"+971 55 000 8422", vehicleMake:"BMW", vehicleModel:"X5", plate:"Dubai C 90812", vehicleType:"SUV", issue:"Accident", description:"Minor front-end accident; vehicle required recovery.", pickup:"Dubai Marina, Dubai", dropoff:"Al Quoz, Dubai", startTime:"09:20 AM", endTime:"10:30 AM", towingType:"Recovery", truckId:"T-05", fare:450, paymentMethod:"Card", paymentStatus:"Paid", status:"Completed"},
  {id:"DT-1041", date:"12 Aug 2026", dateISO:"2026-08-12", driverId:"DT-001", customer:"Bilal Ahmed", phone:"+971 56 000 6610", vehicleMake:"Toyota", vehicleModel:"Corolla", plate:"Dubai D 44190", vehicleType:"Sedan", issue:"Battery Problem", description:"Battery discharged and vehicle would not start.", pickup:"Bur Dubai, Dubai", dropoff:"Al Quoz, Dubai", startTime:"02:15 PM", endTime:"02:50 PM", towingType:"Flatbed", truckId:"T-05", fare:200, paymentMethod:"Cash", paymentStatus:"Paid", status:"Completed"},
  {id:"DT-1038", date:"11 Aug 2026", dateISO:"2026-08-11", driverId:"DT-001", customer:"Sara Malik", phone:"+971 50 000 9871", vehicleMake:"Mercedes", vehicleModel:"C200", plate:"Dubai E 77221", vehicleType:"Sedan", issue:"Overheating", description:"Engine overheated during traffic.", pickup:"Business Bay, Dubai", dropoff:"Ras Al Khor, Dubai", startTime:"04:40 PM", endTime:"05:35 PM", towingType:"Flatbed", truckId:"T-05", fare:280, paymentMethod:"Card", paymentStatus:"Paid", status:"Completed"},
  {id:"DT-1035", date:"10 Aug 2026", dateISO:"2026-08-10", driverId:"DT-001", customer:"Hassan Noor", phone:"+971 52 000 7722", vehicleMake:"Ford", vehicleModel:"Explorer", plate:"Dubai F 12389", vehicleType:"SUV", issue:"Fuel Problem", description:"Vehicle ran out of fuel and required recovery.", pickup:"Al Khail Road, Dubai", dropoff:"Al Quoz, Dubai", startTime:"08:30 PM", endTime:"09:20 PM", towingType:"Recovery", truckId:"T-05", fare:350, paymentMethod:"Cash", paymentStatus:"Paid", status:"Completed"}
];

export const trucks: Truck[] = [
  {id:"T-05", type:"Flatbed", plate:"Dubai 45821", driverId:"DT-001", status:"Active"},
  {id:"T-02", type:"Flatbed", plate:"Dubai 39104", driverId:"DT-002", status:"Active"},
  {id:"T-08", type:"Recovery Truck", plate:"Dubai 72218", driverId:"DT-003", status:"Available"},
  {id:"T-03", type:"Flatbed", plate:"Dubai 50117", driverId:"DT-004", status:"Active"},
  {id:"T-06", type:"Recovery Truck", plate:"Dubai 64022", driverId:"DT-005", status:"Maintenance"},
  {id:"T-09", type:"Heavy Duty Tow Truck", plate:"Dubai 81147", driverId:"", status:"Available"},
  {id:"T-11", type:"Flatbed", plate:"Dubai 22930", driverId:"", status:"Inactive"}
];

/* ---------- Generated job history (deterministic, for filters/reports/charts) ---------- */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return (s % 10000) / 10000;
  };
}

const AREAS = ["Al Barsha","Al Quoz","Deira","Jumeirah","Bur Dubai","Business Bay","Al Nahda","Al Qusais","Dubai Marina","Muhaisnah","Al Warqa","International City","Downtown Dubai","Al Khail Road","Ras Al Khor","Jebel Ali","Discovery Gardens","Al Rashidiya"];
const CUSTOMERS = ["Yousef Al Marri","Fatima Noor","Rashid Obaid","Layla Haddad","Salem Juma","Noora Saeed","Tariq Farooq","Mona Siddiqui","Ibrahim Saleh","Aisha Karim","Waleed Nasser","Hana Yousuf","Omar Farid","Zainab Idris","Faisal Nawaz"];
const ISSUES = ["Engine Problem","Accident","Flat Tyre","Battery Problem","Overheating","Fuel Problem","Electrical Problem","Vehicle Won't Start","Vehicle Recovery","Other"];
const VEHICLES: [string,string,string][] = [["Toyota","Land Cruiser","SUV"],["Nissan","Sunny","Sedan"],["Honda","Civic","Sedan"],["Lexus","RX350","SUV"],["Hyundai","Elantra","Sedan"],["Mitsubishi","Pajero","SUV"],["Chevrolet","Tahoe","SUV"],["Kia","Sportage","SUV"],["Toyota","Hiace","Van"],["Ford","F-150","Pickup"]];
const TOWING_TYPES = ["Flatbed","Wheel Lift","Recovery","Heavy Duty"];
const PAYMENT_METHODS = ["Cash","Card","Company Account"];

const rand = seededRandom(19837);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

const generated: Job[] = [];
const today = new Date("2026-08-13T12:00:00");
let counter = 900;

for (let dayOffset = 1; dayOffset <= 29; dayOffset++) {
  const d = new Date(today);
  d.setDate(d.getDate() - dayOffset);
  const jobsThatDay = 1 + Math.floor(rand() * 3);
  for (let j = 0; j < jobsThatDay; j++) {
    const driver = drivers[Math.floor(rand() * drivers.length)];
    const [make, model, vtype] = pick(VEHICLES);
    const startHour = 7 + Math.floor(rand() * 13);
    const startMin = Math.floor(rand() * 60);
    const durMin = 25 + Math.floor(rand() * 55);
    const start = new Date(d); start.setHours(startHour, startMin, 0);
    const end = new Date(start); end.setMinutes(end.getMinutes() + durMin);
    const statusRoll = rand();
    const status: Job["status"] = statusRoll > 0.94 ? "Cancelled" : statusRoll > 0.9 ? "Pending" : "Completed";
    const fare = 180 + Math.floor(rand() * 340);
    counter += 1;
    generated.push({
      id: `DT-${counter}`,
      date: fmtDate(d),
      dateISO: isoDate(d),
      driverId: driver.id,
      customer: pick(CUSTOMERS),
      phone: `+971 5${Math.floor(rand()*10)} 000 ${1000+Math.floor(rand()*8999)}`,
      vehicleMake: make, vehicleModel: model, vehicleType: vtype,
      plate: `Dubai ${String.fromCharCode(65+Math.floor(rand()*20))} ${10000+Math.floor(rand()*89999)}`,
      issue: pick(ISSUES),
      description: "Roadside assistance requested; job logged by driver via mobile portal.",
      pickup: `${pick(AREAS)}, Dubai`,
      dropoff: `${pick(AREAS)}, Dubai`,
      startTime: start.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}),
      endTime: status === "Cancelled" ? "—" : end.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}),
      towingType: pick(TOWING_TYPES),
      truckId: driver.truckId,
      fare: status === "Cancelled" ? 0 : fare,
      paymentMethod: status === "Completed" ? pick(PAYMENT_METHODS) : "—",
      paymentStatus: status === "Completed" ? "Paid" : status === "Pending" ? "Awaiting" : "—",
      status
    });
  }
}

// today's live jobs (a couple in-progress / pending, on top of curated completed ones)
generated.push(
  {id:"DT-1047", date:"13 Aug 2026", dateISO:"2026-08-13", driverId:"DT-002", customer:"Rashid Obaid", phone:"+971 52 000 4471", vehicleMake:"Kia", vehicleModel:"Sportage", vehicleType:"SUV", plate:"Dubai G 55210", issue:"Vehicle Won't Start", description:"Customer reports vehicle will not start after parking overnight.", pickup:"Al Nahda, Dubai", dropoff:"Al Qusais, Dubai", startTime:"1:40 PM", endTime:"—", towingType:"Flatbed", truckId:"T-02", fare:0, paymentMethod:"—", paymentStatus:"—", status:"In Progress"},
  {id:"DT-1048", date:"13 Aug 2026", dateISO:"2026-08-13", driverId:"DT-004", customer:"Layla Haddad", phone:"+971 56 000 7723", vehicleMake:"Honda", vehicleModel:"Civic", vehicleType:"Sedan", plate:"Dubai H 30981", issue:"Flat Tyre", description:"Rear tyre blowout on Al Khail Road.", pickup:"Al Khail Road, Dubai", dropoff:"Al Quoz, Dubai", startTime:"2:05 PM", endTime:"—", towingType:"Flatbed", truckId:"T-03", fare:0, paymentMethod:"—", paymentStatus:"—", status:"In Progress"},
  {id:"DT-1049", date:"13 Aug 2026", dateISO:"2026-08-13", driverId:"DT-005", customer:"Mona Siddiqui", phone:"+971 54 000 9012", vehicleMake:"Toyota", vehicleModel:"Hiace", vehicleType:"Van", plate:"Dubai J 61190", issue:"Engine Problem", description:"Engine stalled at a signal; awaiting driver dispatch confirmation.", pickup:"Al Warqa, Dubai", dropoff:"Al Quoz, Dubai", startTime:"3:00 PM", endTime:"—", towingType:"Flatbed", truckId:"T-06", fare:0, paymentMethod:"—", paymentStatus:"Awaiting", status:"Pending"}
);

export const jobs: Job[] = [...curatedJobs, ...generated].sort((a,b)=>b.dateISO.localeCompare(a.dateISO) || b.id.localeCompare(a.id));

/* ---------- Driver applications (registration workflow) ---------- */

export const driverApplications: DriverApplication[] = [
  {id:"APP-2201", name:"Farhan Iqbal", phone:"+971 50 118 2290", email:"farhan.iqbal@gmail.com", nationality:"Pakistani", emiratesId:"784-1994-XXXXXXX-X", licenceNumber:"DL-9012-441", licenceCategory:"Heavy Vehicle", appliedOn:"09 Aug 2026", status:"Under Review"},
  {id:"APP-2202", name:"Ravi Kumar", phone:"+971 55 902 1187", email:"ravi.kumar@gmail.com", nationality:"Indian", emiratesId:"784-1991-XXXXXXX-X", licenceNumber:"DL-9012-442", licenceCategory:"Heavy Vehicle", appliedOn:"11 Aug 2026", status:"Submitted"},
  {id:"APP-2203", name:"Shahid Mehmood", phone:"+971 56 774 3320", email:"shahid.m@gmail.com", nationality:"Pakistani", emiratesId:"784-1989-XXXXXXX-X", licenceNumber:"DL-9012-443", licenceCategory:"Heavy Vehicle", appliedOn:"12 Aug 2026", status:"Submitted"}
];

/* ---------- Approve an application into an active driver account ---------- */
/* MVP note: no real backend yet — this creates the driver record + login
   credentials in memory so the flow can be demoed end-to-end. Wire this to
   a real API (POST /drivers) when the backend is built. */
function genTempPassword(){
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i=0;i<6;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return `Dt${s}!`;
}

let driverSeq = drivers.length + 1;

export function approveApplication(app: DriverApplication): { driver: Driver; password: string } {
  const password = genTempPassword();
  const id = `DT-${String(driverSeq++).padStart(3,"0")}`;
  const driver: Driver = {
    id, name: app.name, phone: app.phone, email: app.email, password,
    dob: "—", nationality: app.nationality, address: "—",
    emergencyContact: "—", emergencyPhone: "—",
    emiratesId: app.emiratesId, emiratesExpiry: "—",
    licenceNumber: app.licenceNumber, licenceCategory: app.licenceCategory, licenceExpiry: "—",
    employeeId: id, joiningDate: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
    truckId: "Unassigned", status: "Pending",
    jobsToday: 0, revenueToday: 0, totalJobs: 0, completedJobs: 0, cancelledJobs: 0, totalFare: 0, averageFare: 0,
    lastActivity: "Never"
  };
  drivers.push(driver);
  return { driver, password };
}

/* ---------- Dashboard alerts ---------- */

export const alerts: Alert[] = [
  {id:"a1", level:"warning", title:"Licence expiring soon", description:"Khalid Hassan's UAE driving licence expires on 02 Feb 2027 — renewal reminder recommended."},
  {id:"a2", level:"danger", title:"Truck under maintenance", description:"T-06 (Recovery Truck) has been in maintenance for 2 days — reassign Bilal Ahmed's jobs if needed."},
  {id:"a3", level:"info", title:"New driver applications", description:`${driverApplications.length} applications are awaiting review in Drivers → Applications.`}
];

/* ---------- Revenue / jobs trend for Dashboard & Reports ---------- */

export const revenueTrend: RevenuePoint[] = Array.from({length:14}).map((_,i)=>{
  const d = new Date(today); d.setDate(d.getDate() - (13-i));
  const dayJobs = jobsOnDate(isoDate(d));
  const revenue = dayJobs.filter(j=>j.status==="Completed").reduce((s,j)=>s+j.fare,0);
  return { day: d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"}), jobs: dayJobs.length, revenue };
});

function jobsOnDate(iso: string) {
  return [...curatedJobs, ...generated].filter(j=>j.dateISO===iso);
}