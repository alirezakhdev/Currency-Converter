import React, { useState } from "react";
import swapicon from "./assets/swap.svg";

type CurrencyType = "USD" | "IRR";

function App(): JSX.Element {
  const [amount, setAmount] = useState<string>("");
  const [usdRate, setUsdRate] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<CurrencyType>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyType>("IRR");
  const [resultText, setResultText] = useState<string>("");

  const swap = (): void => {
    const prevFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);
    setResultText("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setResultText("");

    const amt = Number(amount);
    const rate = Number(usdRate);

    if (!amt || amt <= 0 || Number.isNaN(amt)) {
      setResultText("لطفاً یک مقدار معتبر (بزرگ‌تر از صفر) وارد کنید.");
      return;
    }

    const isUsdIrr =
      (fromCurrency === "USD" && toCurrency === "IRR") ||
      (fromCurrency === "IRR" && toCurrency === "USD");

    if (isUsdIrr) {
      if (!rate || rate <= 0 || Number.isNaN(rate)) {
        setResultText("لطفاً نرخ دلار را وارد کنید (۱ دلار = ? ریال).");
        return;
      }

      let converted = 0;
      if (fromCurrency === "USD" && toCurrency === "IRR") {
        converted = amt * rate;
      } else {
        converted = amt / rate;
      }

      setResultText(
        `${new Intl.NumberFormat("fa-IR").format(amt)} ${
          fromCurrency === "USD" ? "دلار" : "ریال"
        } = ${new Intl.NumberFormat("fa-IR", {
          maximumFractionDigits: 2,
        }).format(converted)} ${toCurrency === "USD" ? "دلار" : "ریال"} (با نرخ واردشده)`
      );
    }
  };

  return (
    <div className="currnecy-convertor" dir="rtl">
      <h2 className="convertor-title">مبدل نرخ ارز</h2>
      <form className="convertor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="amount-input">
            مقدار را وارد کنید
          </label>
          <input
            id="amount-input"
            type="number"
            className="form-input"
            required
            value={amount}
            min="0"
            step="any"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
          />
          <label className="form-label" htmlFor="rate-input">
            نرخ دلار را وارد کنید (۱ دلار = ? ریال)
          </label>
          <input
            id="rate-input"
            type="number"
            className="form-input"
            required
            value={usdRate}
            placeholder="مثال: 85000"
            min="0"
            step="any"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsdRate(e.target.value)
            }
          />
        </div>

        <div className="form-group form-currency-group">
          <div className="form-section">
            <label className="form-label" htmlFor="from-select">
              از
            </label>
            <div className="currnecy-select">
              <img
                src={
                  fromCurrency === "USD"
                    ? "https://flagsapi.com/US/flat/64.png"
                    : "https://flagsapi.com/IR/flat/64.png"
                }
                alt={fromCurrency === "USD" ? "پرچم آمریکا" : "پرچم ایران"}
              />
              <select
                id="from-select"
                className="currency-dropdown"
                value={fromCurrency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFromCurrency(e.target.value as CurrencyType)
                }
              >
                <option value="USD">دلار</option>
                <option value="IRR">ریال</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className="swap-icon"
            onClick={swap}
            aria-label="تعویض ارز"
            title="تعویض"
          >
            <img src={swapicon} alt="swap icon" />
          </button>

          <div className="form-section">
            <label className="form-label" htmlFor="to-select">
              به
            </label>
            <div className="currnecy-select">
              <img
                src={
                  toCurrency === "USD"
                    ? "https://flagsapi.com/US/flat/64.png"
                    : "https://flagsapi.com/IR/flat/64.png"
                }
                alt={toCurrency === "USD" ? "پرچم آمریکا" : "پرچم ایران"}
              />
              <select
                id="to-select"
                className="currency-dropdown"
                value={toCurrency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setToCurrency(e.target.value as CurrencyType)
                }
              >
                <option value="IRR">ریال</option>
                <option value="USD">دلار</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          محاسبه
        </button>
        <p className="exchange-rate-result" role="status" aria-live="polite">
          {resultText}
        </p>
      </form>
    </div>
  );
}

export default App;