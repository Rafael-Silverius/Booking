import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function DatePickerWithRange({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-full bg-white flex flex-col justify-center py-2 px-4 hover:bg-gray-200">
          <span className="text-sm">When</span>

          <span className="text-sm text-gray-500 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
                </>
              ) : (
                format(date.from, "MMM dd")
              )
            ) : (
              "Add dates"
            )}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-2" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}
