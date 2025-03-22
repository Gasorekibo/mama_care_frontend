import {
  ActivityIcon,
  Droplet,
  EggFried,
  Heart,
  MoonIcon,
  SunIcon,
  Weight,
  Workflow,
} from "lucide-react";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiUser,
  HiMail,
  HiPhone,
  HiLockClosed,
  HiLocationMarker,
  HiOfficeBuilding,
  HiMap,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/profile/:id",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "users",
    label: "Users",
    path: "/profile/:id/users",
    icon: <HiOutlineUsers />,
  },
  {
    key: "products",
    label: "Products",
    path: "/profile/:id/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/profile/:id/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/profile/:id/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/profile/:id/transactions",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/profile/:id/messages",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/profile/:id/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/profile/:id/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];

export const typeOptions = [
  { value: "NUTRITION", label: "NUTRITION" },
  { value: "EXERCISE", label: "EXERCISE" },
  { value: "MENTAL_HEALTH", label: "MENTAL HEALTH" },
  { value: "PREGNANCY", label: "PREGNANCY" },
];

export const riskLevel = [
  { value: "ALL", label: "ALL" },
  { value: "LOW", label: "LOW" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HIGH", label: "HIGH" },
];

export const filterUserOptions = [
  { value: "PREGNANT_WOMAN", label: "Pregnant women" },
  { value: "ADMIN", label: "Admin" },
  { value: "COMMUNITY_HEALTH_WORKER", label: "chw" },
  { value: "HOSPITAL", label: "healthcare provider" },
];

export const role = [
  { label: "Pregnant Woman", value: "PREGNANT_WOMAN" },
  { label: "chw", value: "COMMUNITY_HEALTH_WORKER" },
];

export const formFields = [
  {
    name: "full_name",
    label: "Full Name",
    icon: HiUser,
    type: "text",
    placeholder: "Eric Cartman",
  },
  {
    name: "email",
    label: "Email",
    icon: HiMail,
    type: "email",
    placeholder: "example@gmail.com",
  },
  {
    name: "phoneNumber",
    label: "Phone",
    icon: HiPhone,
    type: "text",
    placeholder: "+243 999 999 999",
  },
  {
    name: "password",
    label: "Password",
    icon: HiLockClosed,
    type: "password",
    placeholder: "********",
  },
  {
    name: "address",
    label: "Address",
    icon: HiLocationMarker,
    type: "text",
    placeholder: "123 Main St",
  },
  {
    name: "region",
    label: "Region",
    icon: HiOfficeBuilding,
    type: "text",
    placeholder: "Goma",
  },
  {
    name: "province",
    label: "Province",
    icon: HiMap,
    type: "text",
    placeholder: "North Kivu",
  },
];

export const appointmentStatus = [
  { label: "Scheduled", value: "SCHEDULED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Missed", value: "MISSED" },
];

export const appointmentType = [
  { label: "Prenatal Checkup", value: "PRENATAL_CHECKUP" },
  { label: "Consultation", value: "CONSULTATION" },
  { label: "Emergency", value: "EMERGENCY" },
  { label: "Other", value: "OTHER" },
];

export const defaultValueForHealthRecord = {
  weight: "",
  bloodPressure: { systolic: "", diastolic: "" },
  hemoglobinLevel: "",
  fetalHeartRate: "",
  fetalMovements: "",
  weekOfPregnancy: "",
  bloodSugar: { fasting: "", postMeal: "" },
  temperature: "",
  urineProtein: "",
  swellingLevel: "",
  ironLevel: "",
  vitaminD: "",
  mood: "",
  sleepHours: "",
  symptoms: [],
  nutrition: {
    calories: "",
    protein: "",
    hydration: "",
    supplements: [],
  },
  exercise: {
    type: "",
    duration: "",
    intensity: "",
  },
  contractions: [],
};

export const healthRecordFormField = [
  {
    section: "Physical Metrics",
    icon: <Weight className="mr-2 text-blue-500" />,
    fields: [
      { name: "weight", label: "Weight" },
      { name: "weekOfPregnancy", label: "Weeks of Pregnancy" },
      { name: "systolic", label: "Systolic", type: "number" },
      { name: "diastolic", label: "Diastolic", type: "number" },
    ],
  },
  {
    section: "Health Indicators",
    icon: <Heart className="mr-2 text-blue-500" />,
    fields: [
      { name: "hemoglobinLevel", label: "Hemoglobin Level", type: "number" },
      { name: "fetalHeartRate", label: "Fetal Heart Rate", type: "number" },
      { name: "fetalMovements", label: "Fetal Movements", type: "number" },
    ],
    selectFields: [
      {
        label: "Urine Protein",
        name: "urineProtein",
        options: ["Positive", "Negative"],
      },
      {
        label: "Swelling Level",
        name: "swellingLevel",
        options: ["Mild", "Moderate", "Severe"],
      },
    ],
  },
  {
    section: "Nutritional Metrics",
    icon: <Droplet className="mr-2 text-blue-500" />,
    fields: [
      { name: "fasting", label: "Fasting", type: "number" },
      { name: "postMeal", label: "Post Meal", type: "number" },
      { name: "temperature", label: "Temperature", type: "number" },
      { name: "ironLevel", label: "Iron Level", type: "number" },
      { name: "vitaminD", label: "Vitamin D", type: "number" },
    ],
  },
  {
    section: "Symptoms",
    icon: <EggFried className="mr-2 text-blue-500" />,
    fields: [{ name: "symptoms", label: "Symptoms" }],
  },
  {
    section: "Mood & Rest",
    icon: <MoonIcon className="mr-2 text-blue-500" />,
    selectFields: [
      {
        label: "Mood",
        name: "mood",
        options: ["Very Good", "Good", "Not Good", "Bad"],
      },
    ],
    fields: [{ name: "sleepHours", label: "Sleep Hours", type: "number" }],
  },
  {
    section: "Exercise",
    icon: <ActivityIcon className="mr-2 text-blue-500" />,
    selectFields: [
      {
        label: "Exercise Type",
        name: "type",
        options: ["Walking", "Swimming", "Yoga"],
      },
      {
        label: "Exercise Intensity",
        name: "intensity",
        options: ["Low", "Moderate", "High"],
      },
    ],
    fields: [{ name: "duration", label: "Exercise Duration", type: "number" }],
  },
  {
    section: "Nutrition",
    icon: <SunIcon className="mr-2 text-blue-500" />,
    fields: [
      { name: "calories", label: "Calories", type: "number" },
      { name: "protein", label: "Protein", type: "number" },
      { name: "hydration", label: "Hydration", type: "number" },
    ],
  },
  {
    section: "Other Info",
    icon: <Workflow className="mr-2 text-blue-500" />,
    fields: [
      { name: "supplements", label: "Supplements" },
      { name: "contractions", label: "Contractions" },
    ],
  },
];

export const respondersData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Emergency Obstetrician",
    status: "On call",
  },
  {
    id: 2,
    name: "Nurse Robert Kigali",
    role: "Midwife",
    status: "Available",
  },
  { id: 3, name: "David Mutara", role: "Paramedic", status: "En route" },
];

export const TABS = {
  OVERVIEW: "overview",
  PATIENT: "patient",
  MAP: "map",
  TEAM: "team",
};

export const STATUS = {
  RESOLVED: "RESOLVED",
  IN_SERVICE: "in_service",
  EN_ROUTE: "En route",
  ON_SCENE: "On scene",
};
export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer at Sunrise Hospital",
    image: "/images/testimonials/doctor-1.jpg",
    content:
      "This platform has transformed how we manage appointments and connect with patients. The streamlined process has reduced wait times by 40% and improved patient satisfaction scores significantly.",
    type: "hospital",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    role: "New Mother",
    image: "/images/testimonials/patient-1.jpg",
    content:
      "Being pregnant with my first child was overwhelming, but this system made booking appointments and getting medical advice so much easier. I could track my appointments and receive timely reminders throughout my pregnancy journey.",
    type: "pregnant-woman",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Hospital Administrator at Metro Medical Center",
    image: "/images/testimonials/admin-1.jpg",
    content:
      "The analytics and reporting features have given us valuable insights into patient flow and resource allocation. We've been able to optimize our scheduling and improve emergency response times.",
    type: "hospital",
  },
  {
    id: 4,
    name: "Grace Mwangi",
    role: "Community Health Worker",
    image: "/images/testimonials/chw-1.jpg",
    content:
      "This platform bridges the gap between rural communities and healthcare facilities. I can now easily refer patients to specialists and track their care journey, ensuring no one falls through the cracks.",
    type: "community-health-worker",
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "Expectant Mother",
    image: "/images/testimonials/patient-2.jpg",
    content:
      "Managing my high-risk pregnancy became less stressful with this system. I could quickly get appointments with specialists and maintain all my medical records in one place. The emergency contact feature gave me peace of mind.",
    type: "pregnant-woman",
  },
  {
    id: 6,
    name: "Dr. Robert Ochieng",
    role: "Director at Community Health Center",
    image: "/images/testimonials/doctor-2.jpg",
    content:
      "Our rural health center has seen a 30% increase in prenatal visits since implementing this system. The appointment management and patient tracking features have been game-changers for our limited staff.",
    type: "hospital",
  },
  {
    id: 7,
    name: "Nurse Amina Kariuki",
    role: "Head Nurse at Maternal Care Unit",
    image: "/images/testimonials/nurse-1.jpg",
    content:
      "The notification system has been invaluable for our high-risk pregnancy patients. We can monitor their vitals remotely and intervene promptly when necessary. This technology is literally saving lives.",
    type: "hospital",
  },
  {
    id: 8,
    name: "Thomas Ngugi",
    role: "Community Health Coordinator",
    image: "/images/testimonials/chw-2.jpg",
    content:
      "Coordinating care across multiple villages used to require mountains of paperwork. This system has digitized everything, allowing us to focus more on patient care rather than administrative tasks.",
    type: "community-health-worker",
  },
  {
    id: 9,
    name: "Sophia Mutua",
    role: "First-time Mother",
    image: "/images/testimonials/patient-3.jpg",
    content:
      "The educational resources and personalized care plans helped me understand what to expect throughout my pregnancy. The reminders for prenatal vitamins and checkups were especially helpful.",
    type: "pregnant-woman",
  },
  {
    id: 10,
    name: "Dr. David Kimani",
    role: "Obstetrician at Women's Health Center",
    image: "/images/testimonials/doctor-3.jpg",
    content:
      "The ability to review patient history and test results before consultations saves valuable time. I can now see more patients without compromising on quality of care, and follow-ups are much more efficient.",
    type: "hospital",
  },
  {
    id: 11,
    name: "Rebecca Omondi",
    role: "Mother of Twins",
    image: "/images/testimonials/patient-4.jpg",
    content:
      "When I found out I was having twins, I was terrified about the complications. This system connected me with specialized care immediately and the regular monitoring throughout my pregnancy gave me confidence.",
    type: "pregnant-woman",
  },
  {
    id: 12,
    name: "Francis Wekesa",
    role: "Rural Community Health Worker",
    image: "/images/testimonials/chw-3.jpg",
    content:
      "In remote areas, having direct communication with specialists is revolutionary. We can now conduct simple assessments and transmit data for expert opinions without requiring patients to travel long distances.",
    type: "community-health-worker",
  },
  {
    id: 13,
    name: "Dr. Elizabeth Mugo",
    role: "Medical Director at Central Maternity Hospital",
    image: "/images/testimonials/doctor-4.jpg",
    content:
      "The real-time data on hospital capacity and staff availability has improved our resource allocation tremendously. We've reduced transfer times between facilities and ensured specialized care is available when needed.",
    type: "hospital",
  },
  {
    id: 14,
    name: "Janet Nyawira",
    role: "Mother of Three",
    image: "/images/testimonials/patient-5.jpg",
    content:
      "After complicated experiences with my first two children, I was amazed at how smooth this pregnancy was with the help of this platform. The integration between my community clinic and the referral hospital was seamless.",
    type: "pregnant-woman",
  },
  {
    id: 15,
    name: "Peter Kamau",
    role: "Health Outreach Coordinator",
    image: "/images/testimonials/chw-4.jpg",
    content:
      "We've increased vaccination rates and prenatal visit compliance by over 60% in our region. The automated reminder system reaches mothers even in areas with limited connectivity, which has been a game-changer.",
    type: "community-health-worker",
  },
  {
    id: 16,
    name: "Dr. Fatima Hassan",
    role: "Pediatrician at Children's Wellness Center",
    image: "/images/testimonials/doctor-5.jpg",
    content:
      "Having access to complete maternal health records helps us provide better care to newborns. The continuity of care from pregnancy through early childhood development is making a significant difference in outcomes.",
    type: "hospital",
  },
  {
    id: 17,
    name: "Lucy Adhiambo",
    role: "Expectant Mother with Diabetes",
    image: "/images/testimonials/patient-6.jpg",
    content:
      "Managing diabetes during pregnancy requires constant monitoring. This system connected my glucose readings directly to my doctor, allowing for immediate adjustments to my care plan when needed.",
    type: "pregnant-woman",
  },
  {
    id: 18,
    name: "Samuel Otieno",
    role: "Community Health Educator",
    image: "/images/testimonials/chw-5.jpg",
    content:
      "The educational materials available through the platform have helped us conduct more effective community workshops. We can show videos and interactive guides that make complex health information accessible to everyone.",
    type: "community-health-worker",
  },
];