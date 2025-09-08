import { useEffect, useState } from "react";

export default function EditPlantModal({ plant, onClose, onSave }) {
  const [name, setName] = useState(plant?.name || plant?.common_name || "");
  const [location, setLocation] = useState(plant?.location || "");
  const [notes, setNotes] = useState(plant?.notes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(plant?.name || plant?.common_name || "");
    setLocation(plant?.location || "");
    setNotes(plant?.notes || "");
  }, [plant]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ name, location, notes });
    setSaving(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 grid place-items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl p-4 w-[92vw] max-w-md shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Edit plant</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-600">Name</span>
            <input
              className="mt-1 w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Location</span>
            <input
              className="mt-1 w-full border rounded p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Notes</span>
            <textarea
              className="mt-1 w-full border rounded p-2 min-h-24"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="px-3 py-1 rounded bg-emerald-700 text-white disabled:opacity-60"
              type="submit"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
