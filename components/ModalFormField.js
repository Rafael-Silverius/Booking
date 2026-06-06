export default function ModalFormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  placeholder,
}) {
  return (
    <div>
      <label className="text-sm sm:text-[16px]" htmlFor={id}>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          className="w-full border p-2 mb-2 rounded text-sm sm:text-[16px]"
          placeholder={placeholder ?? label}
          value={value ?? ""}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          className="w-full border p-2 mb-2 rounded text-sm sm:text-[16px]"
          type={type}
          placeholder={placeholder ?? label}
          value={value ?? ""}
          min={min}
          onChange={onChange}
        />
      )}
    </div>
  );
}
