// Mock data for insurance
const mockInsuranceData = {
  planName: "Blue Cross Blue Shield",
  planType: "PPO Plan",
  memberId: "XYZ123456789",
  groupNumber: "987654",
  effectiveDate: "Jan 1, 2025",
  cardHolder: "John Doe",
  individualDeductible: {
    current: 750,
    total: 1500
  },
  outOfPocketMax: {
    current: 1250,
    total: 5000
  },
  claims: [
    {
      provider: "City Medical Center",
      date: "Mar 15, 2025",
      service: "Annual Physical",
      amount: "150.00",
      status: "Paid"
    },
    {
      provider: "Specialty Care Clinic",
      date: "Feb 10, 2025",
      service: "Consultation",
      amount: "200.00",
      status: "Pending"
    },
    {
      provider: "City Pharmacy",
      date: "Jan 25, 2025",
      service: "Prescription",
      amount: "45.00",
      status: "Paid"
    }
  ]
};

// Simulate API call with a delay
export const fetchInsuranceData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInsuranceData);
    }, 1000); // Simulate network delay
  });
};

// This function will be implemented later when real API is available
export const fetchInsuranceDataFromAPI = async () => {
  try {
    // Replace with actual API call
    const response = await fetch('/api/insurance');
    if (!response.ok) {
      throw new Error('Failed to fetch insurance data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching insurance data:', error);
    throw error;
  }
};