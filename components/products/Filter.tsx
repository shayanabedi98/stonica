"use client";

import { FilterOptions } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import Btn from "../Btn";

export function Filter() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minPriceRange: 100,
    maxPriceRange: 10000,
    stoneType: [],
    textureType: [],
    colors: null,
    veins: null,
    bookmatched: null,
  });

  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

  function handleFilterChange(
    name: string,
    value: string | boolean | number,
    itemValue?: string,
  ) {
    if (name === "stoneType" || name === "textureType") {
      setFilterOptions((prev) => {
        const currentArray = prev[name] as string[];
        if (value && itemValue) {
          // Add item if it doesn't exist
          return {
            ...prev,
            [name]: currentArray.includes(itemValue)
              ? currentArray
              : [...currentArray, itemValue],
          };
        } else {
          // Remove item
          return {
            ...prev,
            [name]: currentArray.filter((item) => item !== itemValue),
          };
        }
      });
    } else {
      // Handle non-array values (like price ranges)
      setFilterOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const stoneTypes = ["Marble", "Quartz", "Onyx", "Porcelain"];
  const textureType = ["Matte/Honed", "Polished/Shiny"];

  return (
    <form className="sticky top-44 flex min-w-80 flex-col gap-3 rounded-md border-2 border-neutral-700 px-8 py-6 text-sm shadow-sm filter">
      <div className="flex flex-col gap-1">
        <label htmlFor="minPriceRange">Minimum Price</label>
        <hr className="w-10 border-b border-color4" />
        <div className="mt-1 flex flex-col gap-1">
          <input
            type="range"
            name="minPriceRange"
            max={10000}
            min={100}
            value={filterOptions.minPriceRange || 100}
            step={10}
            onChange={(e) =>
              handleFilterChange(e.target.name, Number(e.target.value))
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-gray-600 to-gray-800"
          />
          <span className="text-xs">
            {formatPrice(Number(filterOptions.minPriceRange))}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="maxPriceRange">Maximum Price</label>
        <hr className="w-10 border-b border-color4" />
        <div className="mt-1 flex flex-col gap-1">
          <input
            type="range"
            name="maxPriceRange"
            max={10000}
            min={100}
            value={filterOptions.maxPriceRange || 10000}
            step={10}
            onChange={(e) =>
              handleFilterChange(e.target.name, Number(e.target.value))
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-gray-600 to-gray-800"
          />
          <span className="text-xs">
            {formatPrice(Number(filterOptions.maxPriceRange))}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Stone Type</label>
        <hr className="w-10 border-b border-color4" />
        <div className="grid grid-cols-2">
          {stoneTypes.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="stoneType"
                checked={filterOptions.stoneType?.includes(type)}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.checked, type)
                }
              />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Texture Type</label>
        <hr className="w-10 border-b border-color4" />
        <div className="grid grid-cols-2">
          {textureType.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="textureType"
                checked={filterOptions.textureType?.includes(type)}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.checked, type)
                }
              />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <Btn content={"Apply Filters"} styles="bg-color1 rounded-md" />
    </form>
  );
}
