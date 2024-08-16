import DocumentForm from "@/components/form/DocumentForm";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <main className="py-10">
      <section className="container bg-card border rounded-lg shadow-lg py-6">
        <div className="flex justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="text-primary">Easy</span> Documenter
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Developer:{" "}
              <a
                href="https://mdkayesh.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-primary"
              >
                Md Kayesh
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-4">Follow Me</h3>
            <Socials />
          </div>
        </div>

        {/* form */}
        <DocumentForm />
      </section>
    </main>
  );
}
