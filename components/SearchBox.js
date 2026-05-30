"use client";
import { Button } from "./ui/button";
import SearchBoxItem from "./SearchBoxItem";
import DatePickerWithRange from "./DatePickerWithRange";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function SearchBox() {
  const [searchData, setSearchData] = useState({
    location: "",
    date: undefined,
    guests: "",
  });
  const router = useRouter();

  const handleChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const checkin = searchData.date.from
      ? format(searchData.date.from, "yyyy-MM-dd")
      : null;

    const checkout = searchData.date.to
      ? format(searchData.date.to, "yyyy-MM-dd")
      : null;

    // example: validation
    if (!searchData.location) {
      alert("Please select a location");
      return;
    }

    if (!searchData.date?.from || !searchData.date?.to) {
      alert("Please select dates");
      return;
    }
    router.push(
      `/search?location=${searchData.location}&checkin=${checkin}&checkout=${checkout}&guests=${searchData.guests}`
    );
  };

  return (
    <div className="bg-gray-100 border-b-2">
      <div className="h-28 lg:w-1/2 m-auto ">
        <div className="bg-white flex items-center mx-8 pr-2 rounded-full shadow-md p-2 gap-2">
          <SearchBoxItem
            title="Where"
            subtitle="Select location"
            value={searchData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <DatePickerWithRange
            date={searchData.date}
            setDate={(value) => handleChange("date", value)}
          />

          <SearchBoxItem
            title="Who"
            subtitle="Add guests"
            type="number"
            min={1}
            value={searchData.guests}
            onChange={(e) => handleChange("guests", e.target.value)}
          />

          <Button
            className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
            onClick={handleSearch}
          >
            🔍
          </Button>
        </div>
      </div>
    </div>
  );
}
