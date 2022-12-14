import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../../services";
import style from "./AllCountries.module.scss";
import clsx from "clsx";
import { ICountryData } from "../../interfaces";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import { routes } from "../../navigation";
import { DarkmodeContext } from "../../contexts";
import { useClickOutside } from "../../hooks/useClickOutside";

const AllCountries = () => {
  const [countries, setCountries] = React.useState<ICountryData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("Filter by region");
  const [searchValue, setSearchValue] = React.useState("");
  const [showDropdown, setShowDropDown] = React.useState(false);
  const navigate = useNavigate();
  const { darkmodeEnabled } = React.useContext(DarkmodeContext);
  const searchRef = useClickOutside({ value: searchValue, isSearch: true });
  const filterRef = useClickOutside({
    value: searchValue,
    setValue: setShowDropDown,
  });

  const regions = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

  const onFilter = (data: ICountryData[]) => {
    switch (filter) {
      case "All":
        setCountries(data);
        break;
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
        setShowDropDown(true);
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

  const onSearch = (isSuggestions?: boolean) => {
    if (isSuggestions) {
      return countries
        .filter((data) =>
          data?.name?.common.toLowerCase().startsWith(searchValue.toLowerCase())
        )
        .slice(0, 4);
    }

    return countries.filter((data) =>
      data?.name?.common.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  };

  return (
    <div
      className={clsx(style.wrapper, {
        [style.darkmode]: darkmodeEnabled,
        [style.lightmode]: !darkmodeEnabled,
      })}
    >
      {loading ? (
        "loading"
      ) : (
        <>
          <div className={style["search-container"]}>
            <div className={style.con}>
              <div className={style["search-content"]}>
                <FaSearch
                  color={
                    darkmodeEnabled ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)"
                  }
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
              {!!searchValue && (
                <ul
                  className={clsx(style.suggestions, style["search-content"])}
                  ref={searchRef}
                >
                  {onSearch(true).map((el, index) => (
                    <li
                      key={index + "suggest"}
                      onClick={() =>
                        navigate(routes.CountryRoute + "/" + el.name?.common)
                      }
                    >
                      {el.name?.common}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={style.filter}>
              <div
                className={style.div1}
                onClick={() => setShowDropDown((prev) => !prev)}
                ref={filterRef}
              >
                <p>{filter}</p>
                <FaAngleDown
                  color={
                    darkmodeEnabled ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)"
                  }
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
            {onSearch().map((el, index) => (
              <div
                key={index}
                className={style.content}
                onClick={() =>
                  navigate(routes.CountryRoute + "/" + el?.name?.common)
                }
              >
                <div className={style["img-container"]}>
                  <img src={el?.flags?.svg} alt="flag" className={style.img} />
                </div>
                <ul className={style.details}>
                  <li className={style.name}>{el?.name?.common}</li>
                  <li className={style.item}>
                    <span className={style.span1}>Population: </span>
                    <span>
                      {Intl.NumberFormat().format(Number(el?.population))}
                    </span>
                  </li>
                  <li className={style.item}>
                    <span className={style.span1}> Region: </span>
                    <span>{el?.region}</span>
                  </li>
                  <li className={style.item}>
                    <span className={style.span1}> Capital: </span>
                    <span>{el?.capital?.[0]}</span>
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
