import "./App.css";
import { useState, useEffect } from "react";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/text-input";
import SliderInput from "./components/slider-input";

//to make this EMI calculator we need to get the information
//while in such interviews keep on asking questions to interviewers
//calculate the number of states that are required to build the project
//1. Total cost
//2. Interest Rate
//3. Processing Fee
//4. Down Payment
//5. Loan per month
//6. Tenure

export default function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  function calculateEMI(downPayment) {
    //EMI amount = [PxRx(1+R)^N]/[(1+R)^N-1]
    //this is the formula we have to use
    if (!cost) return;
    const loanAmount = cost - downPayment;
    const Roi = interest / 100;
    const numberOfYear = tenure / 12;
    const EMI =
      (loanAmount * Roi * (1 + Roi) ** numberOfYear) /
      ((1 + Roi) ** numberOfYear - 1);
    return Number(EMI / 12).toFixed(0);
  }
  function calculateDp(emi) {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  }

  function totalDownPayment() {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  }
  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  function updateEmi(e) {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    //calculate the EMI and update it
    const emi = calculateEMI(dp);
    setEmi(emi);
  }
  function updateDownPayment(e) {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    //calculate downpayment and update it
    const dp = calculateDp(emi);
    setDownPayment(dp);
  }

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI calculator
      </span>
      <TextInput
        title={"Total cost of Asset"}
        state={cost}
        setState={setCost}
      />
      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />
      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
      />
      <SliderInput
        title="Down Payment"
        underlineTitle={`Total down Payment - in ${totalDownPayment()}`}
        state={downPayment}
        setState={setDownPayment}
        onChange={updateEmi}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan Per Month"
        underlineTitle={`Total Loan Amount - in ${numberWithCommas(
          (emi * tenure).toFixed(0)
        )}`}
        state={emi}
        onChange={updateDownPayment}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((td) => (
          <button
            className={`tenure ${td === tenure ? "selected" : ""}`}
            onClick={() => setTenure(td)}
          >
            {td}
          </button>
        ))}
      </div>
    </div>
  );
}
