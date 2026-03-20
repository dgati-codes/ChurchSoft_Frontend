import { User } from "lucide-react";
import {useState} from "react"

export function CountryCard({ hierarchy, onEdit, onDelete, onView }) {
  const [menuOpen, setMenuOpen] = useState(false);

const cls = (...a) => a.filter(Boolean).join(" ");


  const parentCount = hierarchy.parents?.length ?? 0;
  const childCount =
    hierarchy.parents?.reduce((s, p) => s + (p.children?.length ?? 0), 0) ?? 0;
  const grandCount =
    hierarchy.parents?.reduce(
      (s, p) =>
        s +
        (p.children?.reduce(
          (cs, c) => cs + (c.grandChildren?.length ?? 0),
          0,
        ) ?? 0),
      0,
    ) ?? 0;

  return (
    <div className="bg-red-600 border border-red-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
            <User size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              {hierarchy.countryName}
            </h3>
            {hierarchy.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                {hierarchy.description}
              </p>
            )}
          </div>
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
          >
            <MoreVertical size={15} />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 bg-red-600 border border-gray-100 rounded-xl shadow-xl py-1 w-36 text-xs">
                <button
                  onClick={() => {
                    onView(hierarchy);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                >
                  <Eye size={13} /> View
                </button>
                <button
                  onClick={() => {
                    onEdit(hierarchy);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(hierarchy.countryName);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {hierarchy.parentLevel && (
          <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold">
            {hierarchy.parentLevel}
          </span>
        )}
        {hierarchy.childLevel && (
          <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">
            {hierarchy.childLevel}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Parents",
            count: parentCount,
            color: "text-sky-600 bg-sky-50",
          },
          {
            label: "Childrenffffffff",
            count: childCount,
            color: "text-violet-600 bg-violet-50",
          },
          {
            label: "Grandchildren",
            count: grandCount,
            color: "text-emerald-600 bg-emerald-50",
          },
        ].map(({ label, count, color }) => (
          <div key={label} className={cls("rounded-xl p-2 text-center", color)}>
            <div className="text-base font-bold leading-none">{count}</div>
            <div className="text-[9px] font-medium mt-0.5 opacity-70">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}