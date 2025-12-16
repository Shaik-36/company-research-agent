const API_URL = "http://localhost:8000";

export async function researchCompany(companyName: string) {
    const response = await fetch(`${API_URL}/research`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_name: companyName }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch research");
    }

    return response.json();
}
