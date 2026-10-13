import React from "react";
import { Section } from "@/components/Section";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background pt-20 md:pt-24">
            <Section className="py-12 md:py-16">
                <div className="container mx-auto">
                    <div className="prose prose-invert prose-sm max-w-4xl mx-auto break-words sm:prose-base">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Términos y Condiciones — ARMA2
                        </h1>

                        <p className="text-text-secondary mb-8">
                            Última actualización: Febrero 2026
                        </p>

                        <div className="space-y-8 text-text-secondary">
                            <p>
                                Arma2 es una plataforma tecnológica destinada a facilitar la organización de partidos de fútbol amateur entre usuarios.
                            </p>

                            <p>
                                El servicio es operado por Nicolás Avayú, persona física con domicilio en la República Argentina.
                            </p>

                            <p>
                                Al acceder o utilizar Arma2, el usuario acepta los presentes Términos y Condiciones.
                            </p>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Naturaleza del servicio</h2>
                                <p>Arma2 actúa exclusivamente como intermediario digital entre usuarios.</p>
                                <p className="mt-4">Arma2:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>No organiza partidos</li>
                                    <li>No administra canchas</li>
                                    <li>No gestiona pagos entre jugadores</li>
                                    <li>No supervisa eventos físicos</li>
                                    <li>No garantiza asistencia de participantes</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Responsabilidad</h2>
                                <p>
                                    La participación en partidos organizados mediante la plataforma se realiza bajo exclusiva responsabilidad de los usuarios.
                                </p>
                                <p className="mt-4">Arma2 no será responsable por:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Lesiones físicas</li>
                                    <li>Daños materiales</li>
                                    <li>Conflictos entre jugadores</li>
                                    <li>Cancelaciones</li>
                                    <li>Incumplimientos</li>
                                    <li>Conductas inapropiadas fuera de la plataforma</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Conducta del usuario</h2>
                                <p>Se prohíbe:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Suplantación de identidad</li>
                                    <li>Publicación de contenido ofensivo o discriminatorio</li>
                                    <li>Conductas violentas</li>
                                    <li>Uso fraudulento del servicio</li>
                                </ul>
                                <p className="mt-4">
                                    Arma2 podrá suspender o eliminar cuentas que incumplan estos términos.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Cuentas de usuario</h2>
                                <p>
                                    El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.
                                </p>
                                <p className="mt-4">
                                    Arma2 podrá suspender o cancelar cuentas ante sospecha de uso indebido.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Contenido del usuario</h2>
                                <p>
                                    El usuario conserva la propiedad de su foto de perfil.
                                </p>
                                <p className="mt-4">
                                    Al subir contenido a la plataforma, otorga a Arma2 una licencia limitada y no exclusiva
                                    para mostrar dicho contenido dentro de la aplicación.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Edad mínima</h2>
                                <p>
                                    El usuario declara ser mayor de 18 años.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Modificaciones</h2>
                                <p>
                                    Arma2 podrá modificar los presentes Términos y Condiciones cuando resulte necesario.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Jurisdicción</h2>
                                <p>
                                    Estos términos se rigen por las leyes de la República Argentina.
                                </p>
                                <p className="mt-4">
                                    Cualquier controversia será sometida a los tribunales competentes conforme a dicha legislación.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
