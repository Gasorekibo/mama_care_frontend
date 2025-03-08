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
