import React from "react";
import { Section } from "@/components/Section";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background pt-20 md:pt-24">
            <Section className="py-12 md:py-16">
                <div className="container mx-auto">
                    <div className="prose prose-invert prose-sm max-w-4xl mx-auto break-words sm:prose-base">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Política de Privacidad — ARMA2
                        </h1>

                        <p className="text-text-secondary mb-8">
                            Última actualización: Febrero 2026
                        </p>

                        <div className="space-y-8 text-text-secondary">
                            <p>
                                Arma2 es una aplicación destinada a la organización de partidos de fútbol amateur.
                                La aplicación es operada por Nicolás Avayú, persona física con domicilio en la República Argentina (en adelante, &quot;el Titular&quot;).
                            </p>

                            <p>
                                La presente Política de Privacidad describe cómo se recopilan, utilizan y protegen los datos personales de los usuarios de Arma2.
                            </p>

                            <p>
                                Al utilizar la aplicación, el usuario acepta las prácticas aquí descriptas.
                            </p>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Datos que recopilamos</h2>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.1 Datos proporcionados por el usuario</h3>
                                <p>Podemos recopilar los siguientes datos personales:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Nombre</li>
                                    <li>Dirección de correo electrónico</li>
                                    <li>Foto de perfil (opcional)</li>
                                    <li>Número de teléfono (opcional)</li>
                                    <li>Nacionalidad y localidad</li>
                                    <li>Posición de juego</li>
                                    <li>Pierna hábil (si el usuario la completa)</li>
                                    <li>Nivel autopercibido (si el usuario lo completa)</li>
                                    <li>Estadísticas deportivas generadas dentro de la aplicación</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.2 Datos recopilados automáticamente</h3>
                                <p>Al utilizar la aplicación, pueden recopilarse datos técnicos tales como:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Dirección IP</li>
                                    <li>Tipo de dispositivo</li>
                                    <li>Sistema operativo</li>
                                    <li>Identificadores técnicos del dispositivo</li>
                                    <li>Información sobre el uso de la aplicación</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.3 Ubicación</h3>
                                <p>Si el usuario otorga permiso, Arma2 podrá acceder a la ubicación GPS del dispositivo con el fin de:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Mostrar partidos cercanos</li>
                                    <li>Mejorar la experiencia y sugerencias geográficas</li>
                                </ul>
                                <p>El usuario puede desactivar este permiso en cualquier momento desde la configuración de su dispositivo.</p>

                                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.4 Notificaciones Push</h3>
                                <p>Arma2 utiliza Firebase Cloud Messaging (Google) para enviar notificaciones relacionadas con:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Invitaciones a partidos</li>
                                    <li>Confirmaciones</li>
                                    <li>Recordatorios</li>
                                    <li>Encuestas posteriores a los partidos</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Finalidad del tratamiento</h2>
                                <p>Los datos recopilados se utilizan para:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Crear y administrar cuentas de usuario</li>
                                    <li>Permitir la organización y participación en partidos</li>
                                    <li>Mostrar información deportiva dentro de la plataforma</li>
                                    <li>Enviar notificaciones relevantes</li>
                                    <li>Mejorar el funcionamiento de la aplicación</li>
                                    <li>Prevenir usos indebidos o fraudulentos</li>
                                </ul>
                                <p className="font-semibold text-white mt-4">Arma2 no vende datos personales.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Compartición de datos</h2>
                                <p>La información del usuario puede ser visible para otros jugadores dentro de la plataforma cuando:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Participa en un partido</li>
                                    <li>Aparece en una lista de jugadores</li>
                                    <li>Su perfil es consultado dentro de la aplicación</li>
                                </ul>
                                <p className="mt-4">
                                    Asimismo, los datos pueden ser compartidos con proveedores tecnológicos que permiten el funcionamiento del servicio
                                    (por ejemplo, servicios de base de datos, almacenamiento y notificaciones push), bajo estándares razonables de seguridad.
                                </p>
                                <p className="mt-4">
                                    Los datos podrán ser revelados ante requerimiento legal de autoridad competente.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Conservación de los datos</h2>
                                <p>Los datos personales se conservarán mientras la cuenta del usuario permanezca activa.</p>
                                <p className="mt-4">El usuario puede solicitar la eliminación de su cuenta escribiendo a:</p>
                                <p className="font-semibold text-primary mt-2">
                                    <a href="mailto:arma2app@gmail.com" className="hover:underline">arma2app@gmail.com</a>
                                </p>
                                <p className="mt-4">
                                    Una vez solicitada la eliminación, los datos serán eliminados o anonimizados en un plazo razonable,
                                    salvo obligación legal en contrario.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Seguridad</h2>
                                <p>
                                    Se implementan medidas técnicas y organizativas razonables para proteger la información personal.
                                </p>
                                <p className="mt-4">
                                    Sin embargo, ningún sistema es completamente invulnerable, por lo que no puede garantizarse seguridad absoluta.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Derechos del usuario</h2>
                                <p>El usuario puede:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Acceder a sus datos</li>
                                    <li>Rectificarlos</li>
                                    <li>Solicitar su eliminación</li>
                                    <li>Revocar consentimientos otorgados</li>
                                </ul>
                                <p className="mt-4">Para ejercer estos derechos deberá escribir a:</p>
                                <p className="font-semibold text-primary mt-2">
                                    <a href="mailto:arma2app@gmail.com" className="hover:underline">arma2app@gmail.com</a>
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Modificaciones</h2>
                                <p>
                                    Arma2 podrá actualizar esta Política de Privacidad cuando resulte necesario.
                                    Las modificaciones relevantes serán informadas dentro de la aplicación.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
