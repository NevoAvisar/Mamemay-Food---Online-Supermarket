import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import MainRouter from "./routes";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[100vw] bg-black h-[100vh]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <MainRouter user={user} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
