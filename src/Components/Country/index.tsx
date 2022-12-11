import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCountryData } from "../../services";
import style from "./Country.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { routes } from "../../navigation";
import { DarkmodeContext } from "../../contexts";
import clsx from "clsx";

interface ICountry {
  country?: string;
}

const Country: React.FC<ICountry> = ({}) => {
  const [countryName, setCountryName] = useState("");
  const [population, setPopulation] = useState("");
  const [region, setRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [nativeName, setNativeName] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [currencies, setCurrencies] = useState<{ [key: string]: string }[]>([]);
  const [topLevelDomain, setTopLevelDomain] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { name } = useParams();
  const { darkmodeEnabled } = React.useContext(DarkmodeContext);

  const handleCountries = async () => {
    setLoading(true);
    const data = await fetchCountryData(name as string);

    type nativeLaguages = {
      official: string;
      common: string;
    };

    const native = Object.values(data?.[0]?.name?.nativeName)?.[0];

    setCapital(data?.[0]?.capital?.[0]);
    setCountryName(data?.[0]?.name?.common);
    setFlag(data?.[0]?.flags?.svg);
    setPopulation(data?.[0]?.population);
    setRegion(data?.[0]?.region);
    setNativeName((native as nativeLaguages)?.common);
    setSubRegion(data?.[0]?.subregion);
    setLanguages(Object.values(data?.[0]?.languages));
    setBorderCountries(data?.[0]?.borders);
    setTopLevelDomain(data?.[0]?.tld);
    setCurrencies(Object.values(data?.[0]?.currencies));
    setLoading(false);
  };

  React.useEffect(() => {
    handleCountries?.();
  }, [name]);

  const CountryDetails = {
    "Native Name": nativeName,
    Population: population,
    Region: region,
    "Sub Region": subRegion,
    Capital: capital,
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          className={clsx(style.parent, {
            [style.darkmode]: darkmodeEnabled,
            [style.lightmode]: !darkmodeEnabled,
          })}
        >
          <button
            className={style.back}
            onClick={() => navigate(routes.AllCountriesRoute)}
            style={{
              color: darkmodeEnabled ? "white" : "black",
              backgroundColor: darkmodeEnabled ? "hsl(209, 23%, 22%)" : "white",
            }}
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div
            className={style.wrapper}
            style={{ color: darkmodeEnabled ? "white" : "black" }}
          >
            <div className={style.left}>
              <img src={flag} alt={`flag of ${flag}`} className={style.img} />
            </div>
            <div className={style.right}>
              <h2 className={style.h2}>{countryName}</h2>
              <div className={style.flex}>
                <ul className={style.first}>
                  {Object.entries(CountryDetails)?.map(
                    (el: string[], index: number) => (
                      <li key={index + "countryDetails"}>
                        <span>{el?.[0]}: </span>
                        <span>
                          {el?.includes("Population")
                            ? Intl.NumberFormat().format(Number(el?.[1]))
                            : el?.[1]}
                        </span>
                      </li>
                    )
                  )}
                </ul>
                <div className={style.last}>
                  <div className={style.currencyDiv}>
                    <p>Top Level Domain: </p>{" "}
                    <p>{topLevelDomain?.join(", ")}</p>
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
                    <p>{languages?.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className={style.borders}>
                <p>Border Countries: </p>
                <ul className={style.flexBorder}>
                  {borderCountries?.map((el: string, index: number) => (
                    <li className={style.brd} key={index}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
