import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termeni și Condiții | Prima Valuta",
  description: "Termenii și condițiile de utilizare ale site-ului Prima Valuta — casă de schimb valutar autorizată BNR în Craiova.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">

        <div className="mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">Document legal</p>
          <h1 className="text-3xl font-bold text-pv-navy-800 md:text-4xl">Termeni și Condiții</h1>
          <p className="text-sm text-muted-foreground">Ultima actualizare: {siteConfig.foundingDate.slice(0, 4)} · Versiunea curentă</p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-pv-navy-800">

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">1. Identificarea operatorului</h2>
            <p>
              Site-ul <strong>primavaluta.ro</strong> este operat de <strong>{siteConfig.legalName}</strong>, persoană juridică română,
              înregistrată la Registrul Comerțului cu nr. <strong>{siteConfig.regCom}</strong>,
              CUI <strong>{siteConfig.cui}</strong>, cu sediul social la{" "}
              <strong>{siteConfig.registeredAddress}</strong>.
            </p>
            <p>
              Punct de lucru: <strong>{siteConfig.address}</strong>.<br />
              Program: <strong>Luni–Duminică 08:00–22:30</strong>.<br />
              Telefon: <strong>{siteConfig.phone}</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">2. Caracterul informativ al cursurilor</h2>
            <p>
              Cursurile valutare afișate pe acest site au caracter <strong>strict orientativ</strong> și sunt actualizate
              periodic de echipa Prima Valuta. Acestea reflectă cursurile practicate la momentul actualizării și pot
              suferi modificări fără notificare prealabilă, în funcție de evoluția piețelor valutare.
            </p>
            <p>
              Cursul afișat online <strong>nu constituie o ofertă fermă</strong> de schimb valutar și nu creează obligații
              contractuale între Prima Valuta SRL și utilizatorii site-ului.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">3. Confirmarea cursului și realizarea tranzacțiilor</h2>
            <p>
              Pentru confirmarea cursului aplicat și realizarea efectivă a oricărei tranzacții de schimb valutar,
              clienții sunt rugați să se prezinte la punctul de lucru al {siteConfig.legalName}, unde cursul final
              va fi stabilit la ghișeu, conform condițiilor de piață din acel moment.
            </p>
            <p>
              {siteConfig.legalName} este autorizată de <strong>Banca Națională a României (BNR)</strong> să desfășoare
              activități de schimb valutar pentru persoane fizice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">4. Limitarea răspunderii</h2>
            <p>
              {siteConfig.legalName} nu răspunde pentru nicio pierdere sau prejudiciu care ar putea rezulta din
              utilizarea informațiilor prezentate pe site, inclusiv cursuri valutare, date de contact sau orice
              alt conținut informativ.
            </p>
            <p>
              Nu garantăm disponibilitatea continuă a site-ului și ne rezervăm dreptul de a modifica, suspenda sau
              întrerupe accesul la acesta fără notificare prealabilă.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">5. Proprietate intelectuală</h2>
            <p>
              Toate elementele de pe site (design, texte, logo, imagini) sunt proprietatea{" "}
              {siteConfig.legalName} sau a partenerilor săi și sunt protejate de legislația privind drepturile
              de autor. Reproducerea lor fără acord scris este interzisă.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">6. Legislație aplicabilă</h2>
            <p>
              Prezentele Termeni și Condiții sunt guvernate de legislația română în vigoare.
              Orice litigiu va fi soluționat pe cale amiabilă sau, în caz contrar, de instanțele judecătorești
              competente din județul Dolj.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">7. Contact</h2>
            <p>
              Pentru orice nelămuriri legate de acești Termeni și Condiții, ne puteți contacta la:
            </p>
            <ul className="space-y-1 text-sm">
              <li><strong>Adresă:</strong> {siteConfig.address}</li>
              <li><strong>Telefon:</strong> {siteConfig.phone}</li>
              <li><strong>Email:</strong> {siteConfig.email}</li>
            </ul>
          </section>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
