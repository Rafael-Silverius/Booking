"use client";
import { Button } from "./ui/button";
import SearchBoxItem from "./SearchBoxItem";
import DatePickerWithRange from "./DatePickerWithRange";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search } from "lucide-react";

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
      <div className=" w-dvw md:w-fit mx-auto px-6 py-4">
        <div
          className="
        bg-white rounded-3xl shadow-md
        flex flex-col md:flex-row
        items-stretch md:items-center
        gap-3 md:gap-2
        p-4 md:p-2
      "
        >
          <SearchBoxItem
            title="Where"
            subtitle="Select location"
            value={searchData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <div className="hidden md:block h-8 w-px bg-gray-300" />
          <DatePickerWithRange
            date={searchData.date}
            setDate={(value) => handleChange("date", value)}
          />
          <div className="hidden md:block h-8 w-px bg-gray-300" />
          <SearchBoxItem
            title="Who"
            subtitle="Add guests"
            type="number"
            min={1}
            value={searchData.guests}
            onChange={(e) => handleChange("guests", e.target.value)}
          />
          <Button
            className="bg-red-500 hover:bg-red-600 text-white rounded-full h-12 px-4 md:px-6 shrink-0 flex items-center gap-2"
            onClick={handleSearch}
          >
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
