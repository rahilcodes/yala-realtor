import { PLACE_SUGGESTIONS } from "@/lib/newHomeSearch";

/** Native <datalist> typeahead of SoCal cities, counties, and popular communities. */
export function PlaceSuggestions({ id }: { id: string }) {
  return (
    <datalist id={id}>
      {PLACE_SUGGESTIONS.map((p) => (
        <option key={p} value={p} />
      ))}
    </datalist>
  );
}
