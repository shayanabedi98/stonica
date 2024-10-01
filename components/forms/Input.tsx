"use client";

import { useState } from "react";

type Props = {
  label: string;
  name: string;
  min?: number;
  max?: number;
  maxLength?: number;
  type: string;
  step?: number;
  disabled?: boolean;
  notRequired?: boolean;
  placeholder: string;
  value: number | string;
  autoComplete?: string;
  pattern?: string;
  showPasswordOption?: boolean;
  onChange: (str1: string, str2: string) => void;
};

export default function Input({
  label,
  name,
  type,
  max,
  maxLength,
  min,
  step,
  onChange,
  placeholder,
  value,
  disabled,
  notRequired,
  autoComplete,
  pattern,
  showPasswordOption,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        pattern={pattern}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        minLength={type == "password" ? 8 : 1}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required={notRequired ? false : true}
        value={value}
        placeholder={placeholder}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${disabled ? "cursor-not-allowed text-neutral-500" : ""}`}
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {type == "password" && showPasswordOption && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer text-xs underline"
        >
          {showPassword ? "hide" : "show"} password
        </span>
      )}
    </div>
  );
}
