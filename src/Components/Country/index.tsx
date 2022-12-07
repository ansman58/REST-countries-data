import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { fetchCountryData } from "../../services";
import style from "./Country.module.scss";

const Country = () => {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [region, setRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [nativeName, setNativeName] = useState('');
  const [subRegion, setSubRegion] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [topLevelDomain, setTopLevelDomain] = useState([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  const handleCountries = async () => {
    const data = await fetchCountryData("brazil");

    // type nativeLaguages = {
    //   official: string;
    //   common: string;
    // };
    const native = Object.values(data?.[0]?.name?.nativeName)?.[0];

    setCapital(data?.[0]?.capital?.[0]);
    setName(data?.[0]?.name?.common);
    setFlag(data?.[0]?.flags?.svg);
    setPopulation(data?.[0]?.population);
    setRegion(data?.[0]?.region);
    setNativeName(native['common']);
    setSubRegion(data?.[0]?.subregion);
    setLanguages(Object.values(data?.[0]?.languages));
    setBorderCountries(data?.[0]?.borders);
    setTopLevelDomain(data?.[0]?.tld);
    setCurrencies(Object.values(data?.[0]?.currencies));
    console.log(Object.values(data?.[0]?.currencies));
    console.log({ data });
  };

  React.useEffect(() => {
    handleCountries?.();
  }, []);

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
            <div className={style.first}>
              <p>Native Name: {nativeName}</p>
              <p>Population: {population}</p>
              <p>Region: {region}</p>
              <p>Sub Region: {subRegion}</p>
              <p>Capital: {capital}</p>
            </div>
            <div className={style.last}>
              <div className={style.currencyDiv}>
                <p>Top Level Domain: </p> <p>{topLevelDomain?.join(", ")}</p>
              </div>
              <div className={style.currencyDiv}>
                <p>Currencies: </p>
                <div>
                  {currencies?.map((el: string, index: number) => (
                    <p key={index + "currency"}>{el.name }</p>
                  ))}
                </div>
              </div>
              <p></p>

              <div className={`${style.lang}, ${style.currencyDiv}`}>
                <p className="">Languages: </p>
                <p>{languages.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className={style.borders}>
            <p>Border Countries: </p>
            <div className={style.flexBorder}>
              {borderCountries.map((el: string, index: number) => (
                <React.Fragment key={index}>
                  <p className={style.brd}>{el}</p>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
