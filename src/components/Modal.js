import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button } from "./Button";
import { Input } from "./Input";

const validationSchema = Yup.object().shape({
  tokenContractAddress: Yup.string()
    .min(64, "Must be 64 characters long")
    .max(64, "Must be 64 characters long")
    // .test((val) => val[0] === "0", "Must start with 0x")
    // .test((val) => val[1] === "x", "Must start with 0x")
    .required("Required"),
  tokenId: Yup.number("Must be a number").required("Required"),
  receiver: Yup.string()
    .min(64, "Must be 64 characters long")
    .max(64, "Must be 64 characters long")
    // .test("prefixCheck0", "Must start with 0x", (val) => val[0] === "0")
    // .test("prefixCheckX", "Must start with 0x", (val) => val[1] === "x")
    .required("Required"),
});

export const Modal = ({ setModalOpen }) => {
  return (
    <>
      <div
        className="absolute cursor-pointer top-0 left-0 right-0 min-w-screen min-h-screen bg-diamond-800 opacity-70 mx-auto z-50"
        type="button"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="absolute top-[50%] left-0 right-0 translate-y-[-50%] bg-white mt-5 p-5 rounded w-[80%] mx-auto shadow-md z-50">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-sm sm:text-3xl">Highfive a Friend</h1>
          <button
            className="hover:bg-diamond-300 rounded"
            onClick={() => setModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={{
            tokenContractAddress: "",
            tokenId: "",
            receiver: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {(prop) => (
            <Form>
              <div className="mx-5">
                <Input label="Token Contract Address" />
                <Input label="Token ID" />
                <Input label="Receiver" />
              </div>
              <div className="bg-diamond-800 w-full h-[1px] opacity-50 mb-4 mt-4" />
              <Button className="block ml-auto" type="submit" tertiary>
                Initiate Highfive
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
