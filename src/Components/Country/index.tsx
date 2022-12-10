import React, { useState } from "react";
import { ICountryData } from "../../interfaces";
import { fetchCountryData } from "../../services";
import style from "./Country.module.scss";

const Country = () => {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [region, setRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [nativeName, setNativeName] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [topLevelDomain, setTopLevelDomain] = useState([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  const handleCountries = async () => {
    const data = await fetchCountryData("brazil");

    type nativeLaguages = {
      official: string;
      common: string;
    };

    const native = Object.values(data?.[0]?.name?.nativeName)?.[0];

    setCapital(data?.[0]?.capital?.[0]);
    setName(data?.[0]?.name?.common);
    setFlag(data?.[0]?.flags?.svg);
    setPopulation(data?.[0]?.population);
    setRegion(data?.[0]?.region);
    setNativeName((native as nativeLaguages)?.common);
    setSubRegion(data?.[0]?.subregion);
    setLanguages(Object.values(data?.[0]?.languages));
    setBorderCountries(data?.[0]?.borders);
    setTopLevelDomain(data?.[0]?.tld);
    setCurrencies(Object.values(data?.[0]?.currencies));
  };

  React.useEffect(() => {
    handleCountries?.();
  }, []);

  const CountryDetails = {
    "Native Name": nativeName,
    Population: population,
    Region: region,
    "Sub Region": subRegion,
    Capital: capital,
  };

  return (
    <div className={style.parent}>
      <button className={style.back}>Back</button>
      <div className={style.wrapper}>
        <div className={style.left}>
          <img src={flag} alt={`flag of ${flag}`} className={style.img} />
        </div>
        <div className={style.right}>
          <h2 className={style.h2}>{name}</h2>
          <div className={style.flex}>
            <ul className={style.first}>
              {Object.entries(CountryDetails)?.map(
                (el: string[], index: number) => (
                  <li key={index + "countryDetails"}>
                    <span>{el?.[0]}: </span>
                    <span>{el?.[1]}</span>
                  </li>
                )
              )}
            </ul>
            <div className={style.last}>
              <div className={style.currencyDiv}>
                <p>Top Level Domain: </p> <p>{topLevelDomain?.join(", ")}</p>
              </div>
              <div className={style.currencyDiv}>
                <p>Currencies: </p>
                <ul>
                  {currencies?.map(
                    (el: { [key: string]: string }, index: number) => (
                      <li key={index + "currency"}>{el.name}</li>
                    )
                  )}
                </ul>
              </div>

              <div className={`${style.lang}, ${style.currencyDiv}`}>
                <p>Languages: </p>
                <p>{languages.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className={style.borders}>
            <p>Border Countries: </p>
            <ul className={style.flexBorder}>
              {borderCountries.map((el: string, index: number) => (
                <li className={style.brd} key={index}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
