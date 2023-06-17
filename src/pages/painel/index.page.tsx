import useLocalStorage from "@/hooks/useLocalStorage";
import { UserType } from "@/types/users";

const Painel = () => {
  const [user, setUser] = useLocalStorage<UserType>("user");
  console.log(user);
  return <div>Painel</div>;
};

export default Painel;
