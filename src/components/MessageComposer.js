import React from "react";
import Input from "./Input";
import { useCreateAsset } from "@livepeer/react";
import { useCallback, useState, useMemo, useContext } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";

import { CopyToClipboard } from "react-copy-to-clipboard";

const MessageComposer = ({
  msgTxt,
  setMsgTxt,
  sendNewMessage,
  sendMessage,
}) => {
  
  return (
    <div className="flex">
      <Input
        setNewValue={setMsgTxt}
        placeholder="Write a message"
        value={msgTxt}
        sendNewMessage={sendNewMessage}
      />
      <br />

      {/* <div className="key">
        {asset?.[0]?.playbackId && (
          <CopyToClipboard text={"/b/b" + asset[0].playbackId}>
            <button>copy video key</button>
          </CopyToClipboard>
        )}
      </div>
      <br /> */}
      {/* <br />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
        </div>
          {error?.message && <p>{error}</p>}

        <button
          onClick={() => {
            createAsset?.();
          }}
          disabled={!createAsset || status === 'loading'}
        >
          Upload
        </button> */}
    </div>
  );
};

export default MessageComposer;
