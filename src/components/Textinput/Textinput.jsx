function TextInput({ label, type, value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
        </div>
    );
}

export default TextInput;
