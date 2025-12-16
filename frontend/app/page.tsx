"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { ReportView } from "@/components/report-view";
import { researchCompany } from "@/lib/api";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (companyName: string) => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const data = await researchCompany(companyName);
      setReport(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative z-10">
        <Hero onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="max-w-md mx-auto mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {report && <ReportView report={report} />}
      </div>
    </main>
  );
}
