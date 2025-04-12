// Mock data for health records
const mockHealthRecords = {
  conditions: [
    { name: 'Hypertension', since: 'Since 2020' },
    { name: 'Type 2 Diabetes', since: 'Since 2022' }
  ],
  allergies: [
    { name: 'Penicillin', severity: 'Severe' }
  ],
  vitalSigns: [
    { name: 'Blood Pressure', value: '138/85 mmHg', date: 'Mar 15, 2025' },
    { name: 'Heart Rate', value: '72 bpm', date: 'Mar 15, 2025' },
    { name: 'Weight', value: '185 lbs', date: 'Mar 15, 2025' },
    { name: 'Blood Glucose', value: '142 mg/dL', date: 'Apr 1, 2025' }
  ],
  // Update the labResults in the mockHealthRecords object
  labResults: [
    {
      id: "lipid-panel",
      name: "Lipid Panel",
      date: "Mar 15, 2025",
      provider: "City Medical Lab",
      status: "Abnormal"
    },
    {
      id: "cbc",
      name: "Complete Blood Count",
      date: "Mar 15, 2025",
      provider: "City Medical Lab",
      status: "Normal"
    },
    {
      id: "hba1c",
      name: "HbA1c",
      date: "Mar 15, 2025",
      provider: "City Medical Lab",
      status: "Abnormal"
    }
  ],
  imaging: [
    {
      name: 'Chest X-Ray',
      date: 'Jan 10, 2025',
      provider: 'City Medical Imaging',
      status: 'Normal'
    },
    {
      name: 'Abdominal Ultrasound',
      date: 'Feb 5, 2025',
      provider: 'City Medical Imaging',
      status: 'Pending'
    }
  ],
  documents: [
    {
      name: 'Annual Physical Summary',
      date: 'Mar 15, 2025',
      type: 'Clinical Summary'
    },
    {
      name: 'Cardiology Consultation',
      date: 'Feb 20, 2025',
      type: 'Specialist Report'
    },
    {
      name: 'Diabetes Management Plan',
      date: 'Jan 5, 2025',
      type: 'Care Plan'
    }
  ]
};

// Simulate API call with a delay
export const fetchHealthRecords = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHealthRecords);
    }, 1000); // Simulate network delay
  });
};

// This function will be implemented later when real API is available
export const fetchHealthRecordsFromAPI = async () => {
  try {
    // Replace with actual API call
    const response = await fetch('/api/health-records');
    if (!response.ok) {
      throw new Error('Failed to fetch health records');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching health records:', error);
    throw error;
  }
};

// Add this to your existing healthRecordsService.js file

// Detailed lab results data
const labResultsDetails = [
  {
    id: "lipid-panel",
    name: "Lipid Panel",
    collectionDate: "April 2, 2025 at 8:15 AM",
    provider: "LabCorp",
    results: [
      {
        name: "Total Cholesterol",
        value: "240 mg/dL",
        status: "HIGH",
        referenceRange: "<200 mg/dL"
      },
      {
        name: "HDL Cholesterol",
        value: "55 mg/dL",
        status: "NORMAL",
        referenceRange: ">40 mg/dL"
      },
      {
        name: "LDL Cholesterol",
        value: "155 mg/dL",
        status: "ELEVATED",
        referenceRange: "<130 mg/dL"
      },
      {
        name: "Triglycerides",
        value: "120 mg/dL",
        status: "NORMAL",
        referenceRange: "<150 mg/dL"
      }
    ]
  },
  {
    id: "cbc",
    name: "Complete Blood Count",
    collectionDate: "March 15, 2025 at 9:30 AM",
    provider: "City Medical Lab",
    results: [
      {
        name: "White Blood Cell Count",
        value: "7.5 x10^3/μL",
        status: "NORMAL",
        referenceRange: "4.5-11.0 x10^3/μL"
      },
      {
        name: "Red Blood Cell Count",
        value: "5.0 x10^6/μL",
        status: "NORMAL",
        referenceRange: "4.5-5.9 x10^6/μL"
      },
      {
        name: "Hemoglobin",
        value: "14.2 g/dL",
        status: "NORMAL",
        referenceRange: "13.5-17.5 g/dL"
      },
      {
        name: "Hematocrit",
        value: "42%",
        status: "NORMAL",
        referenceRange: "41-50%"
      },
      {
        name: "Platelet Count",
        value: "250 x10^3/μL",
        status: "NORMAL",
        referenceRange: "150-450 x10^3/μL"
      }
    ]
  },
  {
    id: "hba1c",
    name: "HbA1c",
    collectionDate: "March 15, 2025 at 9:30 AM",
    provider: "City Medical Lab",
    results: [
      {
        name: "Hemoglobin A1c",
        value: "7.2%",
        status: "HIGH",
        referenceRange: "<5.7%"
      }
    ]
  }
];

// Function to get a specific lab result by ID
export const getLabResultById = (id) => {
  return labResultsDetails.find(lab => lab.id === id);
};