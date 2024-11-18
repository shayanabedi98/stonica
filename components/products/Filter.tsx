"use client";

import { formatPrice } from "@/utils/formatPrice";
import { useEffect } from "react";
import Btn from "../Btn";
import { FilterOptions } from "@/types";

type Props = {
  handleColorChange: (index: number, value: string) => void;
  handleFilterChange: (
    name: string,
    value: string | boolean | number,
    itemValue?: string,
  ) => void;
  filterOptions: FilterOptions;
};

export function Filter({
  filterOptions,
  handleFilterChange,
  handleColorChange,
}: Props) {
  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

  const stoneTypes = ["Marble", "Quartz", "Onyx", "Porcelain"];
  const textureType = ["Matte/Honed", "Polished/Shiny"];
  const colorOptions = [
    "None",
    "White",
    "Black",
    "Gray",
    "Beige",
    "Brown",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Pink",
    "Gold",
    "Cream",
    "Silver",
  ];
  const colorCategories = ["Base", "Veins", "Secondary"];

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
            min={filterOptions.minPriceRange}
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
      <div className="flex flex-col gap-1">
        <label>Colors</label>
        <hr className="w-10 border-b border-color4" />
        <div className="grid grid-cols-3 gap-2">
          {colorCategories.map((cat, catIndex) => (
            <div key={catIndex} className="flex flex-col gap-1">
              <label htmlFor="">{cat}</label>
              <select
                name="color"
                className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
                onChange={(e) => handleColorChange(catIndex, e.target.value)}
              >
                <option value="None">Select</option>
                {colorOptions.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <Btn content={"Apply Filters"} styles="bg-color1 rounded-md" />
    </form>
  );
}
