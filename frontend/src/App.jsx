import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import ChatPage, { loader as chatLoader } from "./pages/Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [{ index: true, element: <ChatPage />, loader: chatLoader }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
