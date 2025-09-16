import { Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tickets and articles..."
        className="pl-10 w-full max-w-sm"
      />
    </div>
  )
}
