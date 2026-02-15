import { Archive, Download, Trash2, ShieldAlert } from "lucide-react";

export default function ArchivePanel() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-12">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-100 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-amber-700" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-900 font-sans">
            Maintenance de la base de données
          </h3>
          <p className="text-sm text-amber-700 mt-1 max-w-2xl">
            Pour optimiser le stockage (Free Tier), vous pouvez archiver les
            demandes traitées. Cela générera un fichier **Excel/CSV** de
            sauvegarde avant de supprimer les fichiers joints volumineux.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 text-amber-700 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors">
              <Download className="w-4 h-4" />
              Télécharger le backup (.csv)
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-700 transition-shadow shadow-sm">
              <Archive className="w-4 h-4" />
              Lancer l'archivage & Nettoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
