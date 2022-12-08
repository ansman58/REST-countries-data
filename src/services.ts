import axios from "axios";

export const fetchCountryData = async (country: string) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
    return data;
  } catch (error) {
    console.log({ error });
  }
};
