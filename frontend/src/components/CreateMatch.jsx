import React, { useEffect, useState } from "react";
import "./CreateMatch.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function CreateMatch({ onMatchCreated }) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [odds, setOdds] = useState("");

  const [showDropdownA, setShowDropdownA] = useState(false);
  const [showDropdownB, setShowDropdownB] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(list);
      })
      .catch((err) => console.error(t("createMatch.errors.errorFetchingCountries"), err));
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!teamA || !teamB || !date) {
    setError(t("createMatch.errors.allFieldsRequired"));
    return;
  }
  if (teamA === teamB) {
    setError(t("createMatch.errors.teamsMustBeDifferent"));
    return;
  }
  if (!odds || Number(odds) <= 0) {
  setError(t("createMatch.errors.invalidOdds"));
  return;
  }
  const matchRequestBody = {
    country1: teamA,
    country2: teamB,
    odds: Number(odds),
    scoreCountry1: null,
    scoreCountry2: null,
    matchDate: date,
  };

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8080/api/matches/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(matchRequestBody),
    });

    const message = await response.text();
    setError(message);
    onMatchCreated?.({
      country1: teamA,
      country2: teamB,
      matchDate: date,
    });

    setTeamA("");
    setTeamB("");
    setSearchA("");
    setSearchB("");
    setDate("");
    setOdds("");
  } catch (err) {
    setError(t("general.serverUnreachable"));
  }
};


  const filteredCountriesA = countries.filter((c) =>
    c.toLowerCase().includes(searchA.toLowerCase())
  );
  const filteredCountriesB = countries.filter((c) =>
    c.toLowerCase().includes(searchB.toLowerCase())
  );

  return (
    <div className="create-match-wrapper">
      <h2 className="create-match-header">{t("createMatch.title")}</h2>
      <form className="create-match-form" noValidate onSubmit={handleSubmit}>
        <label className="datetime-label">
          {t("createMatch.dateLabel")}
          <div className="datetime-wrapper">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <img
              src="/images/calendar_icon.svg"
              alt="calendar"
              className="calendar-icon"
              onClick={(e) => e.target.previousSibling.showPicker?.()}
            />
          </div>
        </label>
        <label>
          {t("createMatch.countryA.label")}
          <input
            type="text"
            placeholder={t("createMatch.countryA.placeholder")}
            value={searchA}
            onChange={(e) => {
              setSearchA(e.target.value);
              setShowDropdownA(true);
            }}
            onFocus={() => setShowDropdownA(true)}
            onBlur={() => setTimeout(() => setShowDropdownA(false), 250)}
          />
          {showDropdownA && searchA && (
            <ul className="dropdown-list">
              {filteredCountriesA.slice(0, 5).map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setTeamA(c);
                    setSearchA(c);
                    setShowDropdownA(false);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </label>

        <label>
          {t("createMatch.countryB.label")}
          <input
            type="text"
            placeholder={t("createMatch.countryB.placeholder")}
            value={searchB}
            onChange={(e) => {
              setSearchB(e.target.value);
              setShowDropdownB(true);
            }}
            onFocus={() => setShowDropdownB(true)}
            onBlur={() => setTimeout(() => setShowDropdownB(false), 250)}
          />
          {showDropdownB && searchB && (
            <ul className="dropdown-list">
              {filteredCountriesB
                .filter((c) => c !== teamA)
                .slice(0, 5)
                .map((c) => (
                  <li
                    key={c}
                    onClick={() => {
                      setTeamB(c);
                      setSearchB(c);
                      setShowDropdownB(false);
                    }}
                  >
                    {c}
                  </li>
                ))}
            </ul>
          )}
        </label>

        <label>
            {t("createMatch.odds")}
            <input
              type="number"
              step="0.01"
              min="1.01"
              placeholder={t("createMatch.oddsPlaceHolder")}
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
            />
         </label>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="create-match-btn">
          {t("createMatch.addButton")}
        </button>
      </form>
    </div>
  );
}
