import GroupedProperties from "@/components/GroupedProperties";
import SearchBox from "@/components/SearchBox";
import { getAllProperties } from "@/services/apiProperties";

export default async function Page() {
  const properties = await getAllProperties();

  const featuredCities = [
    "Athens",
    "Thessaloniki",
    "Chania",
    "Heraklion",
    "Santorini",
    "Mykonos",
    "Nafplio",
  ];

  const groupedProperties = featuredCities.reduce((acc, city) => {
    acc[city] = properties
      .filter((property) => property.city === city)
      .slice(0, 8);

    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <SearchBox />
      <GroupedProperties groupedProperties={groupedProperties} />
    </div>
  );
}
