"use client";

import { motion } from "framer-motion";
import {
    Target,
    Users,
    TrendingUp,
    Building2,
    Code2,
    MapPin,
    DollarSign,
    ExternalLink
} from "lucide-react";

interface Section {
    title: string;
    content: string;
    sources: string[];
}

interface ResearchReport {
    company_name: string;
    sections: Section[];
}

interface ReportViewProps {
    report: ResearchReport;
}

const icons: Record<string, any> = {
    "Idea, Mission & Vision": Target,
    "Founders & Key People": Users,
    "Market & Competitors": TrendingUp,
    "Work Culture & Financials": DollarSign,
    "Tech Stack & Location": Code2,
};

export function ReportView({ report }: ReportViewProps) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-12 text-center"
            >
                <h2 className="text-4xl font-bold text-white mb-2">{report.company_name}</h2>
                <p className="text-gray-400">Comprehensive Analysis Report</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                {report.sections.map((section, index) => {
                    // Attempt to match an icon, default to Building2
                    const Icon = icons[section.title] || Building2;

                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors ${index === 0 ? "md:col-span-2" : "" // Make the first section full width
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-300">
                                <p className="whitespace-pre-wrap">{section.content}</p>
                            </div>

                            {section.sources && section.sources.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-800">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sources</p>
                                    <div className="flex flex-wrap gap-2">
                                        {section.sources.map((source, i) => (
                                            <a
                                                key={i}
                                                href={source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 px-2 py-1 rounded"
                                            >
                                                Source {i + 1}
                                                <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
