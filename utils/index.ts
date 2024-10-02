import { CarProps, FiltersProps } from "@/types";

const axios = require("axios");

export async function getCars(filters: FiltersProps) {
  const { manufacturer, year, fuel, limit, model } = filters;
  const options = {
    method: "GET",
    url: `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`,
    params: { make: manufacturer, model, year, fuel_type: fuel, limit },
    headers: {
      "X-RapidAPI-Key": "1578a7a7eamshfcb281911e6fdebp1063c4jsn806463d657fe",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: String) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    "hrjavascript-mastery"
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
}