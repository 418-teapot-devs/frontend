import { Matches } from "./Matches"

export const PublicMatches = (height) => {
  return (
    <Matches
      matchType="public"
      onClick={()=> {}}
      buttontext="Unirme"
      height={height}
      title="Partidas públicas"
    />
  )
}