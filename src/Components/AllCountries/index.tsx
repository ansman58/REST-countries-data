import React from "react";
import { getAllCountries } from "../../services";
import style from "./AllCountries.module.scss";
import SearchIcon from "../../assets/search-icon.svg";
import Dropdown from "../../assets/arrow-up.svg";
import clsx from "clsx";
import { ICountryData } from "../../interfaces";

const AllCountries = () => {
  const [countries, setCountries] = React.useState<ICountryData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("Filter by region");
  const [searchValue, setSearchValue] = React.useState("");
  const [showDropdown, setShowDropDown] = React.useState(false);

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const onFilter = (data: ICountryData[]) => {
    switch (filter) {
      case "Africa":
        setCountries(
          data.filter((el: ICountryData) => el?.region === "Africa")
        );
        break;
      case "America":
        setCountries(
          data.filter((el: ICountryData) => el?.region === "Americas")
        );
        break;
      case "Asia":
        setCountries(data.filter((el: ICountryData) => el?.region === "Asia"));
        break;
      case "Europe":
        setCountries(
          data.filter((el: ICountryData) => el?.region === "Europe")
        );
        break;
      case "Oceania":
        setCountries(
          data.filter((el: ICountryData) => el?.region === "Oceania")
        );
        break;
      default:
        setCountries(data);
    }
  };

  const onSelectRegion = (region: string) => {
    setFilter(region);
    setShowDropDown(false);
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllCountries();
      onFilter(data);
      setLoading(false);
    })();
  }, [filter]);

  return (
    <div className={style.wrapper}>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className={style["search-container"]}>
            <div className={style["search-content"]}>
              <img
                src={SearchIcon}
                alt="search icon"
                className={style["search-icon"]}
              />
              <input
                type="search"
                placeholder="Search for a country..."
                className={style.search}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className={style.filter}>
              <div
                className={style.div1}
                onClick={() => setShowDropDown((prev) => !prev)}
              >
                <p>{filter}</p>
                <img
                  src={Dropdown}
                  alt=""
                  className={clsx({ [style.rotate]: showDropdown })}
                />
              </div>
              {showDropdown && (
                <ul className={style.ul}>
                  {regions.map((region: string, index: number) => (
                    <li
                      key={index + "region"}
                      data-item={region}
                      onClick={() => onSelectRegion(region)}
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={style.container}>
            {countries
              .filter((el: ICountryData) =>
                el?.name?.common.toLowerCase().includes(searchValue)
              )
              .map((el, index) => (
                <div key={index} className={style.content}>
                  <div className={style["img-container"]}>
                    <img
                      src={el?.flags?.svg}
                      alt="flag"
                      className={style.img}
                    />
                  </div>
                  <ul className={style.details}>
                    <li className={style.name}>{el?.name?.common}</li>
                    <li className={style.item}>
                      <span className={style.span1}>Population:</span>{" "}
                      <span> {el?.population}</span>
                    </li>
                    <li className={style.item}>
                      <span className={style.span1}> Region: </span>{" "}
                      <span>{el?.region}</span>{" "}
                    </li>
                    <li className={style.item}>
                      <span className={style.span1}> Capital: </span>
                      <span>{el?.capital?.[0]}</span>{" "}
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllCountries;