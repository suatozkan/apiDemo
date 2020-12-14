import React, { useEffect, useState } from 'react'

const Get = (url) => {
  const [data, setData] = useState(null)

  const getData = () =>
    fetch(`${url}`).then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data))
  }, [])

  return data
}

export default Get;
