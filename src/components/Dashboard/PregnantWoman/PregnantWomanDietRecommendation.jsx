/* eslint-disable react/prop-types */
const DietRecommendations = ({ trimester = 1 }) => {
  const getCalorieGoal = (trimester) => {
    switch (trimester) {
      case 2:
        return 2200;
      case 3:
        return 2400;
      default:
        return 1800;
    }
  };

  const foodGroups = [
    {
      name: "Grains & Cereals",
      servings: "9-11 servings",
      description:
        "Whole-grain and fortified products with folic acid and iron",
      color: "amber",
    },
    {
      name: "Vegetables",
      servings: "4-5 servings",
      description: "Rich in vitamins A, C, folic acid, iron, and magnesium",
      color: "green",
    },
    {
      name: "Fruits",
      servings: "3-4 servings",
      description: "Fresh fruits for vitamins A, C, potassium, and fiber",
      color: "red",
    },
    {
      name: "Dairy",
      servings: "3 servings",
      description: "Source of protein, calcium, and phosphorus",
      color: "blue",
    },
    {
      name: "Protein",
      servings: "3 servings",
      description:
        "Meat, fish, eggs, beans - rich in B vitamins, protein, iron, zinc",
      color: "purple",
    },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Daily Nutritional Guidelines
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Daily Calorie Goal</span>
            <span className="text-green-600 font-semibold">
              {getCalorieGoal(trimester)} calories
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Trimester {trimester} recommendation
          </p>
        </div>

        <div className="grid gap-3">
          {foodGroups.map((group, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{group.name}</h4>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <span className={`text-${group.color}-600 font-semibold`}>
                  {group.servings}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-sm text-blue-800">
            💧 Remember to drink plenty of water and take your prenatal vitamins
            daily. Avoid caffeine and sugary drinks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietRecommendations;
