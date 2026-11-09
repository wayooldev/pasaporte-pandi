import { brandConfig, specialtiesLabelList } from "@/config/brand";

export function EvergreenFaq() {
  return (
    <section
      id="como-cotizar"
      className="border-b border-border/60 bg-background py-20"
      aria-labelledby="como-cotizar-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Agencia · Cotización · Asesoría
          </p>
          <h2
            id="como-cotizar-heading"
            className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl"
          >
            Cómo cotizar con Pasaporte Pandi
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
            {brandConfig.name} es una agencia de viajes personalizados especializada en{" "}
            {specialtiesLabelList(", ")}. No publicamos precios en la web: solicitas cotización y un
            asesor te acompaña por WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Paso 1</p>
            <h3 className="mt-2 font-display text-lg font-bold text-foreground">Arma tu solicitud</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Elige destino, viajeros y mes tentativo en el cotizador.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Paso 2</p>
            <h3 className="mt-2 font-display text-lg font-bold text-foreground">Recibe tu folio</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Guardamos tu solicitud y te dejamos un resumen para compartir.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Paso 3</p>
            <h3 className="mt-2 font-display text-lg font-bold text-foreground">Habla con tu asesor</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Continuamos por WhatsApp con disponibilidad y propuesta real.
            </p>
          </div>
        </div>

        <div id="beneficios" className="mx-auto mt-14 max-w-3xl space-y-4">
          <h3 className="font-display text-center text-2xl font-bold text-foreground">
            Preguntas frecuentes
          </h3>
          <dl className="space-y-3">
            {brandConfig.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm"
              >
                <dt className="font-bold text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
