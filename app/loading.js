// export default function Loading() {
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8 animate-pulse">
//       {/* Title */}
//       <div className="h-8 w-2/3 bg-gray-200 rounded mb-6" />

//       {/* Images */}
//       <div className="grid grid-cols-4 gap-2 mb-8 h-[450px]">
//         <div className="col-span-2 row-span-2 bg-gray-200 rounded-xl" />
//         <div className="bg-gray-200 rounded-xl" />
//         <div className="bg-gray-200 rounded-xl" />
//         <div className="bg-gray-200 rounded-xl" />
//         <div className="bg-gray-200 rounded-xl" />
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-[2fr_1fr] gap-10">
//         <div>
//           {/* Host */}
//           <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />

//           {/* Description */}
//           <div className="space-y-3 mb-8">
//             <div className="h-4 bg-gray-200 rounded" />
//             <div className="h-4 bg-gray-200 rounded" />
//             <div className="h-4 w-5/6 bg-gray-200 rounded" />
//           </div>

//           {/* Amenities */}
//           <div className="h-6 w-48 bg-gray-200 rounded mb-4" />

//           <div className="grid grid-cols-2 gap-3">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="h-14 bg-gray-200 rounded-xl" />
//             ))}
//           </div>
//         </div>

//         {/* Booking card */}
//         <div className="border rounded-2xl p-6">
//           <div className="h-8 w-24 bg-gray-200 rounded mb-6" />

//           <div className="space-y-4">
//             <div className="h-12 bg-gray-200 rounded-lg" />
//             <div className="h-12 bg-gray-200 rounded-lg" />
//             <div className="h-12 bg-gray-200 rounded-lg" />
//           </div>

//           <div className="h-12 bg-gray-200 rounded-xl mt-6" />
//         </div>
//       </div>
//     </div>
//   );
// }
import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
}
