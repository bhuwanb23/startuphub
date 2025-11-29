import { useState, useEffect } from 'react';

// Mock data for the dashboard
const mockDashboardData = {
  institutionSnapshot: {
    activeResearchProjects: 42,
    activeResearchProjectsGrowth: 12,
    activeStudentStartups: 18,
    activeStudentStartupsGrowth: 8,
    totalPatentsFiled: 27,
    totalPatentsFiledGrowth: 15
  },
  researchProjects: [
    { id: 1, title: 'AI-Powered Drug Discovery', leadFaculty: 'Dr. Sarah Johnson', department: 'Biotechnology', status: 'Ongoing', commercialPotential: 85 },
    { id: 2, title: 'Sustainable Energy Storage', leadFaculty: 'Prof. Michael Chen', department: 'Chemical Engineering', status: 'Completed', commercialPotential: 78 },
    { id: 3, title: 'Quantum Computing Algorithms', leadFaculty: 'Dr. Emily Rodriguez', department: 'Computer Science', status: 'Submitted', commercialPotential: 92 },
    { id: 4, title: 'Biodegradable Plastics', leadFaculty: 'Prof. James Wilson', department: 'Materials Science', status: 'Ongoing', commercialPotential: 70 }
  ],
  studentStartups: {
    newThisSemester: 7,
    inIncubation: 12,
    funded: 5,
    mentorEngagement: 82
  },
  patentActivity: {
    filed: 15,
    published: 8,
    granted: 5,
    drafts: 7
  },
  incubationMetrics: {
    activeCohorts: 3,
    sessionsConducted: 42,
    mentorPoolStrength: 28,
    industryProjects: 15
  },
  facultyContributions: [
    { id: 1, name: 'Dr. Sarah Johnson', publications: 12, patents: 5, grants: 3, studentsMentored: 8 },
    { id: 2, name: 'Prof. Michael Chen', publications: 8, patents: 3, grants: 5, studentsMentored: 6 },
    { id: 3, name: 'Dr. Emily Rodriguez', publications: 15, patents: 7, grants: 2, studentsMentored: 10 },
    { id: 4, name: 'Prof. James Wilson', publications: 6, patents: 2, grants: 4, studentsMentored: 5 }
  ],
  grantsOverview: {
    totalReceived: 2500000,
    utilized: 1875000,
    utilizationPercentage: 75,
    projects: 12,
    expiringSoon: [
      { id: 1, name: 'NSF Research Grant', amount: 500000, expiry: '2023-09-15' },
      { id: 2, name: 'Industry Collaboration Fund', amount: 250000, expiry: '2023-10-01' }
    ]
  },
  eventsDeadlines: [
    { id: 1, title: 'Patent Filing Deadline', date: '2023-07-15', type: 'patent' },
    { id: 2, title: 'Grant Application Due', date: '2023-07-22', type: 'grant' },
    { id: 3, title: 'Startup Demo Day', date: '2023-08-05', type: 'event' },
    { id: 4, title: 'Research Review Meeting', date: '2023-07-30', type: 'review' }
  ],
  notificationsAlerts: [
    { id: 1, title: 'Patent Expiry Alert', message: 'Patent #US-2023-123456 expires in 30 days', type: 'alert', time: '2 hours ago' },
    { id: 2, title: 'Research Review Reminder', message: 'Quarterly review for Quantum Computing Algorithms project', type: 'reminder', time: '1 day ago' },
    { id: 3, title: 'Pending Approval', message: '3 new startup applications awaiting approval', type: 'approval', time: '3 hours ago' },
    { id: 4, title: 'New Startup Submission', message: 'BioTech Innovations has submitted their application', type: 'submission', time: '5 hours ago' }
  ]
};

const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockDashboardData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export { useDashboardData };