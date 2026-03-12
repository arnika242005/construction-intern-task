export const PROJECTS = [
    {
      id: 'p1',
      name: 'Skyline Tower — Phase 2',
      status: 'active',
      startDate: '2025-01-10',
      location: 'Mumbai, Maharashtra',
      description: '42-floor commercial tower, structural works ongoing.',
      manager: 'Ravi Desai',
    },
    {
      id: 'p2',
      name: 'NH-48 Highway Widening',
      status: 'active',
      startDate: '2024-11-03',
      location: 'Pune–Mumbai Expressway',
      description: '18 km 6-lane expansion with flyovers.',
      manager: 'Sneha Kulkarni',
    },
    {
      id: 'p3',
      name: 'Green Valley Residency',
      status: 'on-hold',
      startDate: '2024-08-15',
      location: 'Thane, Maharashtra',
      description: '240-unit residential complex, approvals pending.',
      manager: 'Anil Mehta',
    },
    {
      id: 'p4',
      name: 'Metro Line 7 — Depot',
      status: 'completed',
      startDate: '2023-06-20',
      location: 'Andheri, Mumbai',
      description: 'Train maintenance depot construction, fully delivered.',
      manager: 'Priya Sharma',
    },
    {
      id: 'p5',
      name: 'Coastal Road Bridge',
      status: 'active',
      startDate: '2025-03-01',
      location: 'Versova, Mumbai',
      description: '1.2 km sea bridge connecting coastal road.',
      manager: 'Kiran Joshi',
    },
  ];
  
  export const STATUS_STYLES = {
    active:    { label: 'Active',     bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    'on-hold': { label: 'On Hold',    bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500'   },
    completed: { label: 'Completed',  bg: 'bg-sky-100',     text: 'text-sky-700',     dot: 'bg-sky-500'     },
  };