import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";

export default function App() {
  return (
    <>
      <BrowserRouter>
         <UserRoutes/>
      </BrowserRouter>
    </>
  )
}