import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: `Aviso de Privacidad | ${brandConfig.name}`,
  description:
    "Aviso de Privacidad de Pasaporte Pandi conforme a la LFPDPPP. Conoce cómo tratamos tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Aviso de Privacidad" lastUpdated="6 de noviembre de 2026">
      <section className="space-y-3">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          <strong className="text-foreground">{brandConfig.legalName}</strong> (“Pasaporte Pandi”,
          “nosotros”), con contacto en{" "}
          <a href={`mailto:${brandConfig.contact.email}`}>{brandConfig.contact.email}</a> y WhatsApp{" "}
          <a href={`https://wa.me/${brandConfig.contact.whatsapp.replace(/\D/g, "")}`}>
            {brandConfig.contact.whatsappDisplay}
          </a>
          , es responsable del tratamiento de sus datos personales conforme a la Ley Federal de
          Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Datos que recabamos</h2>
        <p>Podemos solicitar y tratar, entre otros:</p>
        <ul>
          <li>Nombre completo y datos de contacto (teléfono, WhatsApp, correo electrónico).</li>
          <li>
            Información de viaje: destino, fechas tentativas, número de adultos y menores, estilo de
            experiencia y preferencias de paquete.
          </li>
          <li>
            Datos generados por el cotizador web (folio de cotización, estimaciones de precio Pandi vs
            DIY) y registros de interacción con nuestros asesores.
          </li>
          <li>
            Datos técnicos de navegación (cookies, dirección IP, tipo de dispositivo) cuando sea
            necesario para seguridad y mejora del sitio.
          </li>
        </ul>
        <p>
          No solicitamos datos financieros sensibles en el sitio público. Los pagos se gestionan por
          canales acordados con su asesor y/o proveedores oficiales (hoteles, navieras, aerolíneas).
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Finalidades del tratamiento</h2>
        <p>
          <strong className="text-foreground">Finalidades primarias</strong> (necesarias para el
          servicio):
        </p>
        <ul>
          <li>Elaborar cotizaciones, itinerarios y propuestas de viaje personalizadas.</li>
          <li>Contactarlo por WhatsApp, teléfono o correo para dar seguimiento comercial y operativo.</li>
          <li>Gestionar reservas, cambios y soporte antes, durante y después del viaje.</li>
          <li>Cumplir obligaciones legales, fiscales y contractuales aplicables.</li>
        </ul>
        <p>
          <strong className="text-foreground">Finalidades secundarias</strong> (opcionales; puede
          oponerse):
        </p>
        <ul>
          <li>Envío de promociones, newsletters y contenido de destinos.</li>
          <li>Encuestas de satisfacción y mejora de nuestros servicios.</li>
        </ul>
        <p>
          Si no desea que tratemos sus datos para finalidades secundarias, escríbanos a{" "}
          <a href={`mailto:${brandConfig.contact.email}`}>{brandConfig.contact.email}</a> con el
          asunto “Oposición a finalidades secundarias”.
        </p>
      </section>

      <section className="space-y-3">
        <h2>4. Transferencias de datos</h2>
        <p>
          Para operar su viaje podemos compartir datos estrictamente necesarios con proveedores
          turísticos (hoteles, parques, navieras, aerolíneas, aseguradoras y operadores) y con
          proveedores tecnológicos que nos ayudan a operar la plataforma (por ejemplo, hosting,
          base de datos y autenticación), bajo contratos y medidas de seguridad adecuadas. No
          vendemos sus datos personales.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Derechos ARCO y revocación del consentimiento</h2>
        <p>
          Usted puede ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO),
          así como revocar el consentimiento para el tratamiento de sus datos, enviando un correo a{" "}
          <a href={`mailto:${brandConfig.contact.email}`}>{brandConfig.contact.email}</a> con:
        </p>
        <ul>
          <li>Nombre completo y medio de contacto para notificarle la respuesta.</li>
          <li>Descripción clara del derecho que desea ejercer y documentos que lo acrediten.</li>
          <li>Copia de identificación oficial vigente.</li>
        </ul>
        <p>
          Responderemos en los plazos previstos por la LFPDPPP. También puede limitar el uso o
          divulgación de sus datos mediante el mismo canal.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Cookies y tecnologías similares</h2>
        <p>
          El sitio puede utilizar cookies técnicas y de analítica para recordar preferencias, medir
          rendimiento y mejorar la experiencia. Puede configurar su navegador para rechazar cookies;
          algunas funciones del sitio podrían verse limitadas.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Seguridad y conservación</h2>
        <p>
          Aplicamos medidas administrativas, técnicas y físicas razonables para proteger sus datos.
          Conservamos la información el tiempo necesario para las finalidades descritas y para
          cumplir obligaciones legales, y después la eliminamos o anonimizamos de forma segura.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Cambios a este aviso</h2>
        <p>
          Podemos actualizar este Aviso de Privacidad. La versión vigente se publicará en esta
          página con la fecha de última actualización. El uso continuado del sitio después de un
          cambio implica conocimiento de la versión actualizada.
        </p>
      </section>

      <section className="space-y-3">
        <h2>9. Contacto</h2>
        <p>
          Para cualquier duda sobre privacidad:{" "}
          <a href={`mailto:${brandConfig.contact.email}`}>{brandConfig.contact.email}</a> · WhatsApp{" "}
          {brandConfig.contact.whatsappDisplay} · Horario: {brandConfig.contact.hours}.
        </p>
      </section>
    </LegalPage>
  );
}
