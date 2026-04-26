import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | Prima Valuta",
  description: "Politica de confidențialitate și prelucrarea datelor cu caracter personal de către Prima Valuta SRL, în conformitate cu GDPR.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">

        <div className="mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-pv-red-600">GDPR</p>
          <h1 className="text-3xl font-bold text-pv-navy-800 md:text-4xl">Politica de Confidențialitate</h1>
          <p className="text-sm text-muted-foreground">Ultima actualizare: ianuarie 2025</p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-pv-navy-800">

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">1. Operatorul de date</h2>
            <p>
              Datele cu caracter personal colectate prin intermediul site-ului <strong>primavaluta.ro</strong> sunt
              prelucrate de <strong>{siteConfig.legalName}</strong>, CUI <strong>{siteConfig.cui}</strong>,
              Nr. Reg. Com. <strong>{siteConfig.regCom}</strong>, cu sediul social la{" "}
              <strong>{siteConfig.registeredAddress}</strong>.
            </p>
            <p>
              Contact: <strong>{siteConfig.phone}</strong> · <strong>{siteConfig.email}</strong>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">2. Date colectate</h2>
            <p>Site-ul <strong>primavaluta.ro</strong> este un site informativ. Nu colectăm date cu caracter personal
              prin formulare de înregistrare sau conturi de utilizator.</p>
            <p>Pot fi colectate automat următoarele date tehnice:</p>
            <ul className="ml-5 list-disc space-y-1 text-sm">
              <li>Adresa IP a dispozitivului utilizat</li>
              <li>Tipul și versiunea browserului</li>
              <li>Paginile accesate și durata vizitei</li>
              <li>Data și ora accesării</li>
            </ul>
            <p>Aceste date sunt colectate în scop statistic și de securitate, fără a fi asociate unei persoane identificabile.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">3. Scopul și baza legală a prelucrării</h2>
            <p>Datele tehnice sunt prelucrate în baza <strong>interesului legitim</strong> al operatorului (art. 6 alin. 1 lit. f GDPR)
              pentru asigurarea funcționării și securității site-ului.</p>
            <p>
              În cazul în care ne contactați telefonic sau prin email pentru operațiuni de schimb valutar, datele
              furnizate (nume, sumă, tip valută) sunt prelucrate în scopul executării serviciului solicitat,
              în baza <strong>executării unui contract</strong> (art. 6 alin. 1 lit. b GDPR).
            </p>
            <p>
              Conform legislației privind combaterea spălării banilor (Legea nr. 129/2019), pentru tranzacții
              ce depășesc pragurile legale, suntem obligați să colectăm și să păstrăm datele de identificare
              ale clienților (act de identitate) pe perioada prevăzută de lege.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">4. Durata păstrării datelor</h2>
            <p>
              Datele tehnice de trafic sunt păstrate maximum <strong>12 luni</strong>.
              Documentele aferente tranzacțiilor de schimb valutar sunt păstrate conform obligațiilor legale
              în vigoare (minimum 5 ani conform legislației AML).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">5. Drepturile persoanelor vizate</h2>
            <p>În conformitate cu Regulamentul (UE) 2016/679 (GDPR), aveți următoarele drepturi:</p>
            <ul className="ml-5 list-disc space-y-1 text-sm">
              <li><strong>Dreptul de acces</strong> — să solicitați o copie a datelor deținute despre dvs.</li>
              <li><strong>Dreptul la rectificare</strong> — să solicitați corectarea datelor inexacte</li>
              <li><strong>Dreptul la ștergere</strong> — în condițiile prevăzute de GDPR</li>
              <li><strong>Dreptul la restricționarea prelucrării</strong></li>
              <li><strong>Dreptul la portabilitatea datelor</strong></li>
              <li><strong>Dreptul la opoziție</strong> față de prelucrarea bazată pe interes legitim</li>
            </ul>
            <p>
              Aceste drepturi pot fi exercitate prin transmiterea unei solicitări scrise la adresa sediului
              sau pe email la <strong>{siteConfig.email}</strong>. Vom răspunde în termen de maximum 30 de zile.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">6. Transferul datelor către terți</h2>
            <p>
              Nu vindem, nu închiriem și nu transferăm datele dvs. către terți în scopuri comerciale.
              Datele pot fi transmise autorităților publice competente (ANAF, ONPCSB, poliție) exclusiv în
              situațiile prevăzute de lege.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">7. Cookie-uri</h2>
            <p>
              Site-ul poate utiliza cookie-uri tehnice strict necesare funcționării. Nu utilizăm cookie-uri
              de urmărire sau de marketing fără consimțământul dvs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">8. Autoritatea de supraveghere</h2>
            <p>
              Dacă considerați că drepturile dvs. au fost încălcate, aveți dreptul să depuneți o plângere
              la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>,
              cu sediul în București, B-dul G-ral. Gheorghe Magheru 28-30, sector 1.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-pv-navy-800">9. Contact</h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Operator:</strong> {siteConfig.legalName}</li>
              <li><strong>Adresă sediu social:</strong> {siteConfig.registeredAddress}</li>
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
