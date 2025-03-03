import { redirect } from "next/navigation";

export default function Page() {
  redirect("/student-stuff-temp"); // Immediately redirects on the server
  return null;
}
