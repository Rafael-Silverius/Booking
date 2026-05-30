export default function SearchBoxItem({
  title,
  subtitle,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="rounded-full w-1/3 bg-white flex flex-col justify-center py-2 px-4 hover:bg-gray-200">
      <h5 className="text-sm">{title}</h5>
      <input
        type={type}
        placeholder={subtitle}
        value={value}
        onChange={onChange}
        className="outline-none text-sm bg-transparent"
      />
    </div>
  );
}
