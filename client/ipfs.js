const projectId = "2FD1hN0v9vQKdfznxrSDU9Iqsn6"
const projectSecret = "d61739fb8e8a6a94c6e24e54ea67c4d2"

const auth =
  "Basic " +
  buffer.Buffer.from(projectId + ":" + projectSecret).toString("base64")

const ipfs = window.IpfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})
