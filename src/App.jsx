import "./index.css";
import { InputBox } from "./components/index";
import useCurrencyinfo from "./hooks/useCurrencyInfo";
import { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg')`,
        }}
      >
        <div className="flex justify-between gap-5 flex-col">
          <div className="flex flex-wrap justify-center items-center align-middle">
            <div className="backdrop-blur-sm bg-white/30 rounded-lg py-3 px-4 shadow-md flex justify-center shadow-gray-500">
              <h1 className="text-4xl text-center uppercase  rounded-lg px-6 py-3 tracking-wider max-md:text-2xl bg-gradient-to-r from-[#03001e] via-[#7303c0] to-[#ec38bc] inline text-transparent bg-clip-text font-extrabold">
                Currency Exchanger
              </h1>
            </div>
          </div>

          <div className="w-full px-1">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  convert();
                }}
              >
                <div className="w-full mb-1">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>
                <div className="relative w-full h-0.5">
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2  hover:bg-blue-700 transition-all border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                  >
                    swap
                    <SyncAltIcon className="rotate-90 scale-[0.8]" />
                  </button>
                </div>
                <div className="w-full mt-1 mb-4">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg  hover:bg-blue-700 transition-all"
                >
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
