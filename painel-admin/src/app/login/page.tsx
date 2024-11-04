import Form from "../ui/components/Form";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center max-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form />
      </main>
    </div>
  );
}
