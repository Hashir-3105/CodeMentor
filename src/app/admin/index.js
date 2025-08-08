import React from "react";
import Management from "./Management";
import CandidateRequests from "./CandidateRequests";
import TestCatalog from "./ProblemsList";

export default function index() {
  return (
    <>
      <Management />
      <CandidateRequests />
      <TestCatalog />
    </>
  );
}
