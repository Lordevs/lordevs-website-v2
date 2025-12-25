import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
