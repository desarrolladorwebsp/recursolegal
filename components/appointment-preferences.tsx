"use client";

import { useEffect, useRef } from "react";

export function AppointmentPreferences() {
  const date = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (date.current) {
      date.current.min = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago" }).format(new Date());
    }
  }, []);

  return (
    <div className="appointment-preferences">
      <p>Indica una fecha y horario de preferencia. La reunión queda sujeta a confirmación.</p>
      <div className="appointment-fields">
        <label className="contact-field">
          Fecha de preferencia
          <input ref={date} type="date" name="fecha" form="consulta-form" />
        </label>
        <label className="contact-field">
          Franja horaria
          <select name="horario" form="consulta-form" defaultValue="">
            <option value="">Sin preferencia</option>
            <option>Mañana</option>
            <option>Tarde</option>
          </select>
        </label>
      </div>
    </div>
  );
}
