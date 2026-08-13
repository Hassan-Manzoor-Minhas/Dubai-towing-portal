export function driverStatusClass(status: string) {
  switch (status) {
    case "Active": return "badge-green";
    case "Pending": return "badge-amber";
    case "Suspended": return "badge-red";
    default: return "badge-gray";
  }
}

export function jobStatusClass(status: string) {
  switch (status) {
    case "Completed": return "badge-green";
    case "In Progress": return "badge-amber";
    case "Pending": return "badge-amber";
    case "Cancelled": return "badge-red";
    default: return "badge-gray";
  }
}

export function truckStatusClass(status: string) {
  switch (status) {
    case "Active": return "badge-green";
    case "Available": return "badge-gray";
    case "Maintenance": return "badge-amber";
    default: return "badge-red";
  }
}

export function applicationStatusClass(status: string) {
  switch (status) {
    case "Approved": return "badge-green";
    case "Rejected": return "badge-red";
    case "Under Review": return "badge-amber";
    default: return "badge-gray";
  }
}

export function initials(name: string) {
  return name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
}
