const getWedding = async () => {
  return await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/wedding`)
}

export default getWedding
