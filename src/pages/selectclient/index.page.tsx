import { GetServerSideProps } from "next";

import { api } from "@/api";
import SelectclientLayout from "@/layouts/selectclient.layout";
import { Client } from "@/types/users";

interface selectClientProps {
  clients: Client[];
}

const SelectClient = ({ clients }: selectClientProps) => {
  return <SelectclientLayout clients={clients} />;
};

export const getServerSideProps: GetServerSideProps<{
  clients: Client[];
}> = async () => {
  const response = await api.get("/cliente");
  return { props: { clients: response.data } };
};

export default SelectClient;
