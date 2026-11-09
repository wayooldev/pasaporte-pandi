"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { PandiLogo } from "@/components/brand/logo";
import { Package, QuoteLead, PricingBaseline } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  Users,
  Package as PackageIcon,
  Sliders,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "packages" | "baselines">("leads");
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [baselines, setBaselines] = useState<PricingBaseline[]>([]);
  const [loading, setLoading] = useState(true);

  // New package form state
  const [showNewPkgModal, setShowNewPkgModal] = useState(false);
  const [newPkg, setNewPkg] = useState({
    title: "",
    slug: "",
    category: "disney",
    description: "",
    durationDays: 7,
    priceFromUsd: "1200",
    installmentsText: "12 MSI de $100 USD",
    inclusions: "Hospedaje in-resort\nEntradas a parques\nAsesoría concierge",
    imageUrl: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, pkgsRes, baselinesRes] = await Promise.all([
        fetch("/api/leads").then((r) => r.json()),
        fetch("/api/packages").then((r) => r.json()),
        fetch("/api/pricing-baselines").then((r) => r.json()),
      ]);

      if (leadsRes.success) setLeads(leadsRes.leads);
      if (pkgsRes.success) setPackages(pkgsRes.packages);
      if (baselinesRes.success) setBaselines(baselinesRes.baselines);
    } catch (e) {
      console.error("Error loading admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      await fetch(`/api/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      fetchData();
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: newPkg.title,
        slug: newPkg.slug || newPkg.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: newPkg.category,
        description: newPkg.description,
        durationDays: Number(newPkg.durationDays),
        priceFromUsd: String(newPkg.priceFromUsd),
        installmentsText: newPkg.installmentsText,
        inclusions: newPkg.inclusions.split("\n").filter(Boolean),
        imageUrl: newPkg.imageUrl,
        isFeatured: newPkg.isFeatured,
      };

      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowNewPkgModal(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este paquete?")) return;
    try {
      await fetch(`/api/packages/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBaseline = async (destKey: string, adultUsd: string, childUsd: string) => {
    try {
      await fetch("/api/pricing-baselines", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationKey: destKey,
          basePandiAdultUsd: adultUsd,
          basePandiChildUsd: childUsd,
        }),
      });
      alert("¡Regla de precios actualizada!");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <PandiLogo />
          <div className="hidden sm:flex items-center gap-2 border-l border-border pl-6">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              Portal Asesores
            </span>
            <span className="text-xs text-muted-foreground">Panel de Control</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver a la Web</span>
          </Link>
          <UserButton />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                activeTab === "leads"
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Cotizaciones & Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                activeTab === "packages"
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              <PackageIcon className="h-4 w-4" />
              <span>Paquetes Vacacionales ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("baselines")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                activeTab === "baselines"
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>Reglas de Precios</span>
            </button>
          </div>

          {activeTab === "packages" && (
            <Button onClick={() => setShowNewPkgModal(true)} size="sm" className="rounded-xl gap-1.5 font-bold">
              <Plus className="h-4 w-4" />
              <span>Crear Paquete</span>
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Cargando datos del panel...</span>
          </div>
        ) : (
          <>
            {/* TAB 1: LEADS MANAGEMENT */}
            {activeTab === "leads" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">Nuevos Prospectos</p>
                    <p className="text-2xl font-black text-primary mt-1">
                      {leads.filter((l) => l.status === "new").length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">En Contacto</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">
                      {leads.filter((l) => l.status === "contacted").length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">Ventas Concretadas</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">
                      {leads.filter((l) => l.status === "converted").length}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/60 text-muted-foreground uppercase text-[10px] font-bold border-b border-border">
                        <tr>
                          <th className="px-5 py-3.5">Folio</th>
                          <th className="px-5 py-3.5">Cliente</th>
                          <th className="px-5 py-3.5">Contacto</th>
                          <th className="px-5 py-3.5">Destino</th>
                          <th className="px-5 py-3.5">Viajeros</th>
                          <th className="px-5 py-3.5">Est. Pandi USD</th>
                          <th className="px-5 py-3.5">Estado</th>
                          <th className="px-5 py-3.5 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-muted/30">
                            <td className="px-5 py-4 font-mono font-bold text-primary">
                              {lead.folio}
                            </td>
                            <td className="px-5 py-4 font-semibold text-foreground">
                              {lead.customerName}
                            </td>
                            <td className="px-5 py-4 text-muted-foreground">
                              <div className="flex flex-col gap-0.5">
                                <span>{lead.customerContact}</span>
                                {lead.customerEmail ? (
                                  <span className="text-[11px]">{lead.customerEmail}</span>
                                ) : null}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-foreground font-medium">
                              {lead.destination}
                            </td>
                            <td className="px-5 py-4 text-muted-foreground">
                              {lead.adults} Ad. {lead.children > 0 ? `· ${lead.children} Men.` : ""}
                            </td>
                            <td className="px-5 py-4 font-bold text-foreground">
                              ${Number(lead.estimatedPandiUsd).toLocaleString()} USD
                            </td>
                            <td className="px-5 py-4">
                              <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted">
                                {(["new", "contacted", "converted"] as const).map((st) => (
                                  <button
                                    key={st}
                                    onClick={() => handleStatusChange(lead.id, st)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${
                                      lead.status === st
                                        ? st === "new"
                                          ? "bg-primary text-white"
                                          : st === "contacted"
                                          ? "bg-amber-500 text-white"
                                          : "bg-emerald-600 text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    {st === "new" ? "Nuevo" : st === "contacted" ? "Contactado" : "Cerrado"}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <a
                                href={`https://wa.me/${lead.customerContact.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-whatsapp/10 px-2.5 py-1 text-[11px] font-bold text-whatsapp hover:bg-whatsapp hover:text-white transition-colors"
                              >
                                <WhatsAppIcon className="h-3 w-3" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PACKAGES MANAGEMENT */}
            {activeTab === "packages" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="rounded-2xl bg-card border border-border p-5 space-y-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {pkg.category}
                          </Badge>
                          <h4 className="font-bold text-foreground text-base mt-1">{pkg.title}</h4>
                        </div>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded-lg hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                        <span className="font-black text-primary text-base">
                          ${Number(pkg.priceFromUsd).toLocaleString()} USD
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {pkg.durationDays} Días · {pkg.installmentsText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PRICING BASELINES */}
            {activeTab === "baselines" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {baselines.map((bl) => (
                    <div key={bl.id} className="rounded-2xl bg-card border border-border p-6 space-y-4 shadow-sm">
                      <div>
                        <Badge variant="secondary" className="text-xs font-bold uppercase">
                          {bl.destinationKey}
                        </Badge>
                        <h4 className="text-lg font-bold text-foreground mt-1">
                          {bl.destinationLabel}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-1">
                            Base Pandi Adulto (USD)
                          </label>
                          <Input
                            defaultValue={bl.basePandiAdultUsd}
                            id={`adult-${bl.destinationKey}`}
                            type="number"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-1">
                            Base Pandi Menor (USD)
                          </label>
                          <Input
                            defaultValue={bl.basePandiChildUsd}
                            id={`child-${bl.destinationKey}`}
                            type="number"
                          />
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => {
                          const adultInput = document.getElementById(`adult-${bl.destinationKey}`) as HTMLInputElement;
                          const childInput = document.getElementById(`child-${bl.destinationKey}`) as HTMLInputElement;
                          handleSaveBaseline(bl.destinationKey, adultInput.value, childInput.value);
                        }}
                        className="w-full text-xs font-bold rounded-xl"
                      >
                        Guardar Precios Base
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* New Package Modal */}
      {showNewPkgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 shadow-2xl space-y-5">
            <h3 className="text-xl font-bold text-foreground">Crear Nuevo Paquete</h3>

            <form onSubmit={handleCreatePackage} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-foreground">Título del Paquete</label>
                <Input
                  required
                  value={newPkg.title}
                  onChange={(e) => setNewPkg({ ...newPkg, title: e.target.value })}
                  placeholder="Ej. Aventura Mágica en Walt Disney World"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-foreground">Categoría</label>
                  <select
                    className="w-full h-11 rounded-xl border border-input bg-card px-3 text-xs"
                    value={newPkg.category}
                    onChange={(e) => setNewPkg({ ...newPkg, category: e.target.value })}
                  >
                    <option value="disney">Disney & Universal</option>
                    <option value="crucero">Cruceros</option>
                    <option value="europa">Europa</option>
                    <option value="playa">Playas & All-Inclusive</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1 text-foreground">Duración (Días)</label>
                  <Input
                    type="number"
                    required
                    value={newPkg.durationDays}
                    onChange={(e) => setNewPkg({ ...newPkg, durationDays: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-foreground">Precio Desde (USD)</label>
                  <Input
                    required
                    value={newPkg.priceFromUsd}
                    onChange={(e) => setNewPkg({ ...newPkg, priceFromUsd: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-foreground">Texto Mensualidades</label>
                  <Input
                    required
                    value={newPkg.installmentsText}
                    onChange={(e) => setNewPkg({ ...newPkg, installmentsText: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-foreground">URL de Imagen</label>
                <Input
                  required
                  value={newPkg.imageUrl}
                  onChange={(e) => setNewPkg({ ...newPkg, imageUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-foreground">Descripción</label>
                <textarea
                  className="w-full h-20 rounded-xl border border-input bg-card p-3 text-xs"
                  required
                  value={newPkg.description}
                  onChange={(e) => setNewPkg({ ...newPkg, description: e.target.value })}
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-foreground">Inclusiones (una por línea)</label>
                <textarea
                  className="w-full h-24 rounded-xl border border-input bg-card p-3 text-xs"
                  required
                  value={newPkg.inclusions}
                  onChange={(e) => setNewPkg({ ...newPkg, inclusions: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowNewPkgModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Paquete</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
