import { JoinMatchForm } from "../join/JoinMatchForm"
import { Matches } from "./Matches"
import { JoinMatch } from "../join/api/JoinMatch"
import { useAuth } from "../../../hooks/useAuth"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const PublicMatches = () => {
  const { user } = useAuth()
  
  const [open, setOpen] = useState(false)
  const [match, setMatch] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // When clicking join button, dialog with form pops up
  const handleClick = (newMatch) => {
    setOpen(true)
    setMatch(newMatch)
  }

  return (
    <React.Fragment>
      {Boolean(match) && <JoinMatchForm
        onSubmit={async (values) => {
          const success = await JoinMatch(values, match, user.token, setLoading, setError)
          if (success) navigate(`matches/${match.id}`);
        }}
        open={open}
        setOpen={setOpen}
        match={match}
        error={error}
        loading={loading}
      />}
      <Matches
        matchType="public"
        onClick={handleClick}
        buttontext="Unirme"
      />
    </React.Fragment>
  )
};