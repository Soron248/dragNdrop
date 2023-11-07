import Link from "next/link";

export default function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-10 font-bold text-xl underline text-blue-600">
      <Link href="/advance">Basic</Link>
      <Link href="/menulist"> Medium</Link>
      <Link href="/role">Standard </Link>
      <Link href="/new_role">Advance</Link>
    </div>
  );
}
