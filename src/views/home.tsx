import React, { memo } from "react";
interface Iprops {
  children?: React.ReactNode;
}
const Home: React.FC<Iprops> = () => {
  return <div>Home</div>;
};
export default memo(Home);
