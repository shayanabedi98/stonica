"use client";

import { formatPrice } from "@/utils/formatPrice";
import Btn from "../Btn";
import { FilterOptions } from "@/types";
import { FaFilter } from "react-icons/fa";

type Props = {
  handleClearFilter: () => void;
  handleSubmitFilters: (e: React.FormEvent) => void;
  handleFilterChange: (
    name: string,
    value: string | boolean | number,
    itemValue?: string,
  ) => void;
  filterOptions: FilterOptions;
};

export function Filter({
  filterOptions,
  handleClearFilter,
  handleSubmitFilters,
  handleFilterChange,
}: Props) {
  // useEffect(() => {
  //   console.log(filterOptions);
  // }, [filterOptions]);

  const stoneTypes = ["Marble", "Quartz", "Onyx", "Porcelain"];
  const textureType = ["Matte/Honed", "Polished/Shiny"];
  const colorOptions = [
    "- Select -",
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

  return (
    <form
      className="sticky top-44 flex min-w-80 flex-col gap-3 rounded-md border-2 border-neutral-800 px-8 py-6 text-sm shadow-sm filter"
      onSubmit={(e: React.FormEvent) => handleSubmitFilters(e)}
    >
      <h3 className="flex items-center gap-1">
        <FaFilter /> Filter Options
      </h3>
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
          <div className="flex flex-col gap-1">
            <label>Base</label>
            <select
              name="baseColor"
              value={filterOptions.baseColor!}
              className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
            >
              {colorOptions.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Veins</label>
            <select
              name="veinColor"
              value={filterOptions.veinColor!}
              className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
            >
              {colorOptions.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Secondary</label>
            <select
              name="secondaryColor"
              value={filterOptions.secondaryColor!}
              className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
            >
              {colorOptions.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label>Vein Thickness</label>
        <hr className="w-10 border-b border-color4" />
        <div className="grid grid-cols-3 gap-2">
          <select
            name="veins"
            value={filterOptions.veins!}
            className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          >
            <option value="- Select -">Select</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
            <option value="No Veins">No Veins</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label>Bookmatched</label>
        <hr className="w-10 border-b border-color4" />
        <div className="grid grid-cols-3 gap-2">
          <select
            value={filterOptions.bookmatched!}
            name="bookmatched"
            className="mt-1 h-8 rounded-md border-2 border-neutral-600 bg-primary px-2 py-1 text-secondary"
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          >
            <option value="- Select -">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <Btn content={"Apply Filters"} styles="bg-color1 w-full rounded-md" />
        <Btn
          onClick={handleClearFilter}
          type="button"
          content={"Clear Filters"}
          styles="bg-secondary w-full rounded-md"
        />
      </div>
    </form>
  );
}
