import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: `Términos de Servicio | ${brandConfig.name}`,
  description:
    "Términos y condiciones de uso del sitio y de los servicios de cotización y asesoría de Pasaporte Pandi.",
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos de Servicio" lastUpdated="6 de noviembre de 2026">
      <section className="space-y-3">
        <h2>1. Aceptación</h2>
        <p>
          Al acceder o usar el sitio web de <strong className="text-foreground">{brandConfig.name}</strong>{" "}
          y sus herramientas (cotizador, catálogo, descarga de PDF, formularios de contacto), usted
          acepta estos Términos de Servicio y nuestro{" "}
          <a href="/privacidad">Aviso de Privacidad</a>. Si no está de acuerdo, no utilice el sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Descripción del servicio</h2>
        <p>
          Pasaporte Pandi es una agencia de viajes que ofrece asesoría, cotización y gestión de
          experiencias turísticas (Disney &amp; Universal, cruceros, Europa, playas y otros
          destinos). El sitio permite:
        </p>
        <ul>
          <li>Explorar paquetes y rangos de precio de referencia.</li>
          <li>Obtener cotizaciones estimadas mediante el cotizador en línea.</li>
          <li>Solicitar seguimiento por WhatsApp, correo o teléfono.</li>
          <li>Descargar propuestas en PDF asociadas a un folio.</li>
        </ul>
        <p>
          La contratación definitiva del viaje se formaliza con un asesor Pandi y/o con los
          proveedores oficiales (hoteles, navieras, aerolíneas, parques), bajo las políticas de cada
          proveedor.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Cotizaciones y precios</h2>
        <ul>
          <li>
            Los montos mostrados en el cotizador y el catálogo son <strong className="text-foreground">estimaciones</strong> en
            USD (u otra moneda indicada) y pueden variar por temporada, tipo de cambio, disponibilidad,
            edad de los viajeros, impuestos, propinas y promociones vigentes.
          </li>
          <li>
            La comparación “DIY vs Pandi” es orientativa y no constituye una oferta vinculante ni una
            garantía de ahorro en todos los escenarios.
          </li>
          <li>
            Un folio de cotización identifica su solicitud; la tarifa final se confirma por escrito
            (WhatsApp, correo o propuesta formal) antes de apartar o pagar.
          </li>
          <li>
            Las mensualidades / MSI mencionadas dependen de la institución financiera o el esquema de
            apartados que se acuerde en cada caso.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>4. Reservas, pagos y cancelaciones</h2>
        <p>
          Condiciones de anticipo, fechas de liquidación, cambios y cancelaciones se comunican al
          confirmar el paquete y están sujetas a las reglas del proveedor (hotel, aerolínea, naviera,
          parque). Pasaporte Pandi no es responsable de políticas de terceros, demoras de vuelos,
          cierres de atracciones o causas de fuerza mayor, aunque le asistiremos en la medida de lo
          posible.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Uso aceptable del sitio</h2>
        <p>Usted se compromete a:</p>
        <ul>
          <li>Proporcionar información veraz y actualizada en formularios y chats.</li>
          <li>No usar el sitio para fines ilícitos, spam o extracción automatizada abusiva.</li>
          <li>
            No intentar acceder al panel de administración u otras áreas restringidas sin autorización.
          </li>
        </ul>
        <p>
          El acceso al “Portal Asesores” está reservado a personal autorizado autenticado. Cualquier
          uso indebido puede suspenderse sin previo aviso.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Propiedad intelectual</h2>
        <p>
          Marcas, logotipos, textos, diseño, ilustraciones y software del sitio pertenecen a
          Pasaporte Pandi o a sus licenciantes. No está permitido copiar, modificar o redistribuir
          contenidos con fines comerciales sin autorización escrita. Las marcas de terceros (Disney,
          Universal, etc.) pertenecen a sus respectivos titulares; Pasaporte Pandi opera como agencia
          asesora independiente según las certificaciones y acuerdos vigentes.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Limitación de responsabilidad</h2>
        <p>
          El sitio se ofrece “tal cual”. En la medida permitida por la ley mexicana, Pasaporte Pandi
          no responde por daños indirectos, lucro cesante o interrupciones del servicio derivadas de
          fallas técnicas, de terceros o de uso indebido de las herramientas en línea. Nuestra
          responsabilidad frente a un viaje contratado se limita a lo establecido en la confirmación
          de servicios y la normativa aplicable.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Enlaces externos</h2>
        <p>
          El sitio puede incluir enlaces a WhatsApp, redes sociales o sitios de proveedores. No
          controlamos esos entornos; su uso se rige por sus propios términos y avisos de privacidad.
        </p>
      </section>

      <section className="space-y-3">
        <h2>9. Modificaciones</h2>
        <p>
          Podemos actualizar estos Términos en cualquier momento. La versión vigente se publica en
          esta página con su fecha de actualización. El uso continuado del sitio implica aceptación
          de los cambios.
        </p>
      </section>

      <section className="space-y-3">
        <h2>10. Ley aplicable y contacto</h2>
        <p>
          Estos Términos se interpretan conforme a las leyes de los Estados Unidos Mexicanos. Para
          dudas o reclamaciones relacionadas con el sitio o el servicio:{" "}
          <a href={`mailto:${brandConfig.contact.email}`}>{brandConfig.contact.email}</a> · WhatsApp{" "}
          <a href={`https://wa.me/${brandConfig.contact.whatsapp.replace(/\D/g, "")}`}>
            {brandConfig.contact.whatsappDisplay}
          </a>{" "}
          · {brandConfig.contact.hours}.
        </p>
      </section>
    </LegalPage>
  );
}
