import React from "react"
import { useMutation, gql } from "@apollo/client"

const UPLOAD_GQL = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(UPLOAD_GQL)
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => (
    validity.valid && mutate({ variables: { file } })
  )

  if (loading) {
    return (<div>Loading...</div>)
  }

  if (error) {
    return (<div>{JSON.stringify(error, null, 2)}</div>)
  }

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  )
}

export default UploadFile