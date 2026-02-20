import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const data = await prisma.reclamation.findMany({
      include: {
        student: {
          select: {
            name: true,
            email: true,
            apogeeCode: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const rows = data.map((rec) => ({
      Date: rec.createdAt.toLocaleDateString(),
      Statut: rec.status,
      "Nom Étudiant": rec.student.name,
      "Code Apogée": rec.student.apogeeCode,
      Type: rec.type.replace(/_/g, " "),
      Sujet: rec.subject,
      Description: rec.description,
      "Réponse Admin": rec.adminResponse || "—",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Réclamations");

    // Fix: Use 'buffer' type and convert to a standard Node.js Buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Export_Reclamations_${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel" },
      { status: 500 },
    );
  }
}
