import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ethers } from "ethers";

import { BlankModal } from "./BlankModal";
import { Button } from "./Button";
import { Input } from "./Input";

import contractABI from "../NftHighFives.json";

const validationSchema = Yup.object().shape({
  tokenContractAddress: Yup.string()
    .required("Required")
    .test("len", "Must be exactly 42 characters", (val) => val?.length === 42),
  tokenId: Yup.number("Must be a number").required("Required"),
  receiver: Yup.string()
    .required("Required")
    .test("len", "Must be exactly 42 characters", (val) => val?.length === 42),
});

export const ReceptionModal = ({ setModalOpen, signer }) => {
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [contract, setContract] = useState();

  useEffect(() => {
    if (window.ethereum) {
      const newContract = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        contractABI.abi,
        signer
      );
      setContract(newContract);
    }
  }, []);

  const acceptHighfive = async (values) => {
    setAcceptLoading(true);
    try {
      await contract.receiveHighFive(
        values.tokenContractAddress,
        values.tokenId,
      );
      setTimeout(() => {
        setAcceptLoading(false);
        setModalOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const rejectHighfive = async (values) => {
    setRejectLoading(true);
    try {
      await contract.rejectHighFive(
        values.tokenContractAddress,
        values.tokenId,
      );
      setTimeout(() => {
        setRejectLoading(false);
        setModalOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BlankModal setModalOpen={setModalOpen}>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-sm sm:text-3xl">Highfive a Friend</h1>
        <button
          className="hover:opacity-50 active:opacity-30 rounded"
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
      <div className="bg-diamond-800 w-full h-[1px] opacity-30 mb-4 mt-4" />
      <Formik
        initialValues={{
          tokenContractAddress: "",
          tokenId: "",
          receiver: "",
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <div className="mx-5">
              <Input label="Token Contract Address" />
              <Input label="Token ID" />
            </div>
            <div className="bg-diamond-800 w-full h-[1px] opacity-30 mb-4 mt-4" />
            <div className="flex justify-between">
              <button
                className="hover:opacity-50 active:opacity-30 rounded px-4"
                onClick={props.handleReset}
              >
                Clear Form
              </button>
              <div className="flex">
                <Button
                  className="block ml-2 disabled:hover:bg-white disabled:active:bg-white disabled:opacity-50 bg-white border border-red-500 hover:bg-red-300 active:bg-red-200 text-diamond-800"
                  disabled={!props.isValid}
                  secondary
                  loading={rejectLoading}
                  onClick={(values) => rejectHighfive(values)}
                >
                  Reject Highfive
                </Button>
                <Button
                  className="block ml-2 disabled:hover:bg-diamond-800 disabled:active:bg-diamond-800 disabled:opacity-50 "
                  disabled={!props.isValid}
                  loading={acceptLoading}
                  onClick={(values) => acceptHighfive(values)}
                >
                  Accept Highfive
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </BlankModal>
  );
};
