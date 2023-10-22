import React, { useState } from "react";
import { shortAddress } from "../utils/utils";
import Input2 from "./Input2";

const AddressInput = ({
  isNewMsg,
  onInputBlur,
  errorMsg,
  selectedConvo,
}) => {
  const [newAddress, setNewAddress] = useState("");
  return (
    <div className={`flex flex-dir-col ${isNewMsg ? "flex-1" : ""}`}>
      {isNewMsg ? (
        <>
          <Input2
            setNewValue={setNewAddress}
            placeholder="Type wallet address ..."
            value={newAddress}
            onInputBlur={() => onInputBlur(newAddress)}
          />
          {errorMsg && (
            <span className="new-address flex-dir-col">{errorMsg}</span>
          )}
        </>
      ) : (
        <b>{shortAddress(selectedConvo)}</b>
      )}
    </div>
  );
};

export default AddressInput;
