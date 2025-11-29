import { useState, useEffect } from 'react';

// Mock data for the dashboard
const mockDashboardData = {
  overview: {
    name: "InnovateHub Incubator",
    location: "San Francisco, CA",
    domainTags: ["Tech", "AI", "Biotech", "Clean Energy"],
    totalStartups: 42,
    activePrograms: 7,
    fundingSecured: "$8.2M",
    mentorsAvailable: 28
  },
  activePrograms: [
    {
      id: 1,
      name: "AI Innovation Program",
      duration: "12 weeks",
      startups: 8,
      progress: 65,
      status: "Active"
    },
    {
      id: 2,
      name: "GreenTech Accelerator",
      duration: "16 weeks",
      startups: 12,
      progress: 40,
      status: "Active"
    },
    {
      id: 3,
      name: "HealthTech Incubation",
      duration: "20 weeks",
      startups: 6,
      progress: 25,
      status: "Active"
    },
    {
      id: 4,
      name: "FinTech Growth Program",
      duration: "8 weeks",
      startups: 10,
      progress: 90,
      status: "Ending Soon"
    }
  ],
  pipeline: {
    stages: [
      {
        id: 1,
        name: "Application Submitted",
        count: 24,
        color: "bg-gray-200"
      },
      {
        id: 2,
        name: "Under Review",
        count: 18,
        color: "bg-blue-200"
      },
      {
        id: 3,
        name: "Interview Scheduled",
        count: 12,
        color: "bg-yellow-200"
      },
      {
        id: 4,
        name: "Decision Pending",
        count: 8,
        color: "bg-purple-200"
      },
      {
        id: 5,
        name: "Accepted",
        count: 6,
        color: "bg-green-200"
      }
    ],
    recentApplications: [
      {
        id: 1,
        name: "TechFlow Innovations",
        submitted: "2 days ago",
        status: "Review"
      },
      {
        id: 2,
        name: "GreenEnergy Solutions",
        submitted: "1 week ago",
        status: "Interview"
      }
    ]
  },
  metrics: [
    { name: 'Startups Funded', value: 78, target: 100, percentage: 78 },
    { name: 'Program Completion', value: 92, target: 100, percentage: 92 },
    { name: 'Mentor Engagement', value: 85, target: 100, percentage: 85 },
    { name: 'Revenue Growth', value: 65, target: 100, percentage: 65 }
  ],
  resources: [
    { name: "Meeting Rooms", used: 12, total: 15, percentage: 80 },
    { name: "Co-working Spaces", used: 42, total: 50, percentage: 84 },
    { name: "Lab Facilities", used: 8, total: 10, percentage: 80 },
    { name: "Equipment", used: 28, total: 35, percentage: 80 }
  ],
  activities: [
    {
      id: 1,
      type: "application",
      title: "New application received",
      description: "TechFlow Innovations submitted their application",
      time: "2 hours ago",
      icon: "📋",
      color: "indigo"
    },
    {
      id: 2,
      type: "meeting",
      title: "Session scheduled",
      description: "Mentor meeting with GrowthHackers set for tomorrow",
      time: "5 hours ago",
      icon: "📅",
      color: "green"
    },
    {
      id: 3,
      type: "funding",
      title: "Funding milestone",
      description: "DataDriven secured Series A funding",
      time: "1 day ago",
      icon: "💰",
      color: "blue"
    },
    {
      id: 4,
      type: "program",
      title: "Program update",
      description: "AI Innovation Program reached midpoint",
      time: "1 day ago",
      icon: "📊",
      color: "purple"
    },
    {
      id: 5,
      type: "resource",
      title: "Resource booked",
      description: "Conference room reserved for FinTech Pro",
      time: "2 days ago",
      icon: "🏢",
      color: "yellow"
    }
  ],
  events: [
    {
      id: 1,
      title: "Demo Day - AI Program",
      date: "2023-06-15",
      time: "14:00",
      type: "Presentation",
      attendees: 24
    },
    {
      id: 2,
      title: "Mentor Training Workshop",
      date: "2023-06-18",
      time: "10:00",
      type: "Workshop",
      attendees: 18
    },
    {
      id: 3,
      title: "Investor Pitch Session",
      date: "2023-06-20",
      time: "16:00",
      type: "Pitch",
      attendees: 12
    },
    {
      id: 4,
      title: "Startup Orientation",
      date: "2023-06-22",
      time: "09:00",
      type: "Orientation",
      attendees: 30
    }
  ]
};

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch('/api/dashboard');
        // const result = await response.json();
        
        // For now, we'll use mock data
        setTimeout(() => {
          setData(mockDashboardData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;