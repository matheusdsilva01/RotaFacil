import { GetServerSideProps } from "next";

import { api } from "@/api";
import SelectconductorLayout from "@/layouts/selectconductor.layout";
import { Conductor } from "@/types/users";

interface selectConductorProps {
  conductors: Conductor[];
}

const SelectConductor = ({ conductors }: selectConductorProps) => {
  return <SelectconductorLayout conductors={conductors} />;
};

export const getServerSideProps: GetServerSideProps<{
  conductors: Conductor[];
}> = async () => {
  const response = await api.get("/condutor");
  return { props: { conductors: response.data } };
};

export default SelectConductor;
