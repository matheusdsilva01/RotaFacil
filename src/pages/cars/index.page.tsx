import { GetServerSideProps } from "next";
import React from "react";

import { api } from "@/api";
import CarsLayout from "@/layouts/cars.layout";
import { Car } from "@/types/cars";

interface CarsProps {
  cars: Car[];
}

const Cars = ({ cars }: CarsProps) => {
  return <CarsLayout cars={cars} />;
};

export const getServerSideProps: GetServerSideProps<{
  cars: Car[];
}> = async () => {
  const response = await api.get("/veiculo");

  return { props: { cars: response.data } };
};
export default Cars;
