import { GetServerSideProps } from "next";
import React from "react";

import { api } from "@/api";
import CarsLayout from "@/layouts/cars.layout";
import { Cars } from "@/types/cars";

interface CarsProps {
  cars: Cars[];
}

const Cars = ({ cars }: CarsProps) => {
  return <CarsLayout cars={cars} />;
};

export const getServerSideProps: GetServerSideProps<{
  cars: Cars[];
}> = async () => {
  const response = await api.get("/veiculo");

  return { props: { cars: response.data } };
};
export default Cars;
