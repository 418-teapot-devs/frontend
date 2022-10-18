import React, { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { creatematch } from "./api/creatematch"
import { CreateMatchForm } from "./CreateMatchForm"

export const CreateMatch = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [failure, setFailure] = useState(false)
  const { user } = useAuth()

  const onSubmit = async (values) => {
    setLoading(true)
    const response = await creatematch(values, user.token)
    switch (response.status) {
      case 201:
        setLoading(false)
        setSucces(true)
        setFailure(false)
        break
      default:
        setLoading(false)
        setSucces(false)
        setFailure(true)
        break
    }
  }

  return (
    <CreateMatchForm
      onSubmit={onSubmit}
      loading={loading}
      success={success}
      failure={failure}
    />
  )
}
